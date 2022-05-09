import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ShowData } from "../../models/showData";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  public hidden: string = "hidden";
  public key = "3ec0a4b3-eb6f-4c94-b219-fbc68577ffaa";
  public resDelBookmark: any = {};
  public processing: string = "";
  public errorMessage: string = "";
  public result: ShowData[] = [{
      score: 0,
      show: {
          id: 0,
          url: "",
          name: "",
          type: "",
          language: "",
          genres: ["",],
          status: "",
          runtime: 0,
          averageRuntime: 0,
          premiered: "",
          ended: "",
          officialSite: "",
          schedule: {
              time: "",
              days: ["",],
          },
          rating: {
              average: 0,
          },
          weight: 0,
          network: {
              id: 0,
              name: "",
              country: {
                  name: "",
                  code: "",
                  timezone: "",
              },
              officialSite: "",
          },
          webChannel: null,
          dvdCountry: null,
          externals: {
              tvrage: 0,
              thetvdb: 0,
              imdb: "",
          },
          image: {
              medium: "",
              original: "",
          },
          summary: "",
          updated: 0,
          _links: {
              self: {
                  href: "",
              },
              previousepisode: {
                  href: "",
              },
          },
      },
  }, ]

  constructor(private apiservice: ApiService) {
    //console.log("ShowTableComponent::constructor()");
  }

  ngOnInit() {
    //this.apiservice.getShowData().subscribe(result => (this.result = result));
  }

  getBookmarkData() {
    this.processing = "Processing ...";
    this.apiservice.getBookmark(this.key).subscribe({
      next:result => {
          this.result = result;
          this.hidden = "";
          this.processing = "";
        },
      error: error => {
          this.errorMessage = error.message;
          this.processing = "";
          alert('There was an error!')
          console.error('There was an error!', error);
      }
    });
  }

  delBookmark(showId: number) {
    this.apiservice.delBookmark(this.key, showId).subscribe({
        next: resDelBookmark => {
          this.resDelBookmark = resDelBookmark;
          if (this.resDelBookmark.success == true) {
            this.getBookmarkData();
          } else {
            alert("An error occurred while trying to delete a bookmark!");
          }
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
    });
  }

  delAllBookmark() {
    this.apiservice.delAllBookmark(this.key).subscribe({
        next: resDelBookmark => {
          this.resDelBookmark = resDelBookmark;
          if (this.resDelBookmark.success == true) {
            this.getBookmarkData();
          } else {
            alert("An error occurred while trying to delete a bookmark!");
          }
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
    });
  }
}