from datetime import timedelta, date
from .const import *
import requests 
import json

def store_schedule(collection_schedule):
    collection_schedule.delete_many({})
    for x in range(10):
        d = date.today() + timedelta(days=-x)
        url = URL_API_SCHEDULE + "?date=%s&country=US" % d.strftime('%Y-%m-%d') 
        response = requests.get(url)
        collection_schedule.insert_many(response.json())
    return

def store_bookmark(collection_bookmark, key, show_id):
    collection_bookmark.insert_one({
        "user_id": key,
        "show_id": show_id       
        })
    return

def get_bookmark(collection_bookmark, key):
    return collection_bookmark.find({
        "user_id": key
        })

def del_bookmark(collection_bookmark, key, show_id):
    return collection_bookmark.delete_one({
        "user_id": key,
        "show_id": show_id
        })

def del_all_bookmark(collection_bookmark, key):
    return collection_bookmark.delete_many({
        "user_id": key,
        })

def analize_schedule(collection_schedule):
    genres = {}
    resp = []
    for doc in collection_schedule.find():
        for gender in doc["_embedded"]["show"]["genres"]:
            if gender in genres: 
                genres[gender] += 1 
            else: 
                genres[gender] = 1
    
    for x in genres:
        resp.append({
            "name": x,
            "count": genres[x]
            })
    
    return resp
