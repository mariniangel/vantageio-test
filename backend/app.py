from flask import Flask, jsonify, Response, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId
from helpers.functions import store_schedule, \
                              analize_schedule, \
                              store_bookmark, \
                              get_bookmark, \
                              del_bookmark, \
                              del_all_bookmark
from helpers.const import *
import requests

# mongodb connection
mongo_client = MongoClient(DB_HOST_MONGO,
                     username=DB_USERNAME,
                     password=DB_PASSWORD,
                     authMechanism='SCRAM-SHA-1')
collection_schedule = mongo_client.db.schedule
collection_bookmark = mongo_client.db.bookmark

# Start flask app
app = Flask(__name__)
CORS(app)

# Search show by name
@app.route('/api/shows/search', methods=['GET'])
def search_shows_get():
    q = request.args.get("q", default="", type=str)

    if q not in (None, ""):
        url = URL_API_SEARCH + "?q=" + q
        try:
            response = requests.get(url)
            return dumps(response.json())
        except Exception as e:
            return dumps({'success':False, "message": "Service unavailable"}), 500, {'ContentType':'application/json'}
    else:
        return dumps({'success':False, "message": "No data provided"}), 400, {'ContentType':'application/json'}

# Search data for show by id 
@app.route('/api/shows', methods=['GET'])
def search_show_get():
    id = request.args.get("id", default="", type=str)

    if id not in (None, ""):
        url = URL_API_SHOW + id
        try:
            response = requests.get(url)
            return dumps(response.json())
        except Exception as e:
            return dumps({'success':False, "message": "Service unavailable"}), 500, {'ContentType':'application/json'}
    else:
        return dumps({'success':False, "message": "No data provided"}), 400, {'ContentType':'application/json'}

# Store & analize Gender
@app.route('/api/schedule', methods=['GET'])
def schedule_get():
    try:
        store_schedule(collection_schedule)
        return dumps(analize_schedule(collection_schedule))
    except Exception as e:
        return dumps({'success':False, "message": "Service unavailable"}), 500, {'ContentType':'application/json'}

# Store bookmark
@app.route('/api/bookmark', methods=['POST'])
def bookmark_post():
    show_id = request.json["show_id"]
    key = request.json["key"]

    try:
        store_bookmark(collection_bookmark, key, show_id)
        return dumps({'success':True}), 200, {'ContentType':'application/json'} 

    except Exception as e:
        return dumps({'success':False, "message": "Internal server error"}), 500, {'ContentType':'application/json'}

# Get bookmarks and data from shows api
@app.route('/api/bookmark', methods=['GET'])
def bookmark_get():
    shows = []
    key = request.args.get("key", default="", type=str)

    try:    
        for show in get_bookmark(collection_bookmark, key):
            try:
                resp = {}
                url = URL_API_SHOW + str(show["show_id"])
                resp["score"] = 1
                resp["show"] = requests.get(url).json()
                shows.append(resp)
            except Exception as e:
                continue
        return dumps(shows), 200, {'ContentType':'application/json'} 
    except Exception as e:
        return dumps({'success':False, "message": "Service unavailable"}), 500, {'ContentType':'application/json'}

# Delete a bookmark 
@app.route('/api/bookmark', methods=['DELETE'])
def bookmark_delete():
    show_id = request.args.get("show_id", default="", type=int)
    key = request.args.get("key", default="", type=str)

    try:
        del_bookmark(collection_bookmark, key, show_id)
        return dumps({'success':True, 'show_id': show_id}), 200, {'ContentType':'application/json'} 
    except Exception as e:
        return dumps({'success':False, "message": "Internal server error"}), 500, {'ContentType':'application/json'}

# Delete all bookmarks 
@app.route('/api/clear_bookmark', methods=['DELETE'])
def bookmark_delete_all():
        key = request.args.get("key", default="", type=str)
    #try:
        del_all_bookmark(collection_bookmark, key)
        return dumps({'success':True}), 200, {'ContentType':'application/json'} 
    #except Exception as e:
    #    return dumps({'success':False, "message": "Internal server error"}), 500, {'ContentType':'application/json'}

@app.route('/<path:filename>')
def media_posts(filename):
    return send_from_directory('dist', filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8081)
