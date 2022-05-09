import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ShowData } from "../../models/showData";


@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})

export class ShowTableComponent implements OnInit {
  public hidden: string = "hidden";
  public processing: string = "";
  public key="3ec0a4b3-eb6f-4c94-b219-fbc68577ffaa";
  public resPostBookmark: any = {};
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

  searchShowData(search: string) {
    this.processing = "Processing ...";
    this.apiservice.getShowData(search).subscribe({
      next: result => {
          this.result = result;
          this.processing = "";
          this.hidden = "";
      },
      error: error => {
          this.errorMessage = error.message;
          this.processing = "";
          alert('There was an error!')
          console.error('There was an error!', error);
      }
    });
  }

  addBookmark(showId: number) {
    this.apiservice.postBookmark(this.key, showId).subscribe({
      next: resPostBookmark => {
          this.resPostBookmark = resPostBookmark;
          if (this.resPostBookmark.success == true) {
            alert("Bookmark added!");
          } else {
            alert("An error occurred while trying to add a new bookmark!");
          }
      },
      error: error => {
          this.errorMessage = error.message;
          alert('There was an error!')
          console.error('There was an error!', error);
      }
    });
  }

}

