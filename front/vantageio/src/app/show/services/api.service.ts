import { Injectable } from '@angular/core';
import { ShowData } from "../models/showData";
import { StoreAnalize } from "../models/store-analize";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private result: ShowData[] = [{
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
  private resGenres: StoreAnalize[] = [{
      name: "",
      count: 0
    },];
  private resPostBookmark: any = {};
  private resDelBookmark: any = {};

  private showUrlSearch: string = "http://127.0.0.1:8081/api/shows/search";
  private genresCalculateUrl: string = "http://127.0.0.1:8081/api/schedule";
  private bookmarkUrl:string = "http://127.0.0.1:8081/api/bookmark";
  private delAllBookmarkUrl:string = "http://127.0.0.1:8081/api/clear_bookmark";

  constructor(private http: HttpClient) {}

  public getShowData(newValue: string): Observable<ShowData[]> {
    console.log(newValue);
    return this.http.get<ShowData[]>(this.showUrlSearch + "?q=" + newValue);
  }

  public getGenres(): Observable<any> {
    return this.http.get<any>(this.genresCalculateUrl);
  }

  public getBookmark(key: string): Observable<ShowData[]> {
    return this.http.get<ShowData[]>(this.bookmarkUrl + "?key=" + key);
  }

  public postBookmark(key: string, show_id: number): Observable<any> {
    let post: any = {key: "", show_id: 0};
    post.key = key;
    post.show_id = show_id;
    return this.http.post<any>(this.bookmarkUrl, post);
  }

  public delBookmark(key: string, show_id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('show_id', show_id);
    params = params.append('key', key);

    return this.http.delete<any>(this.bookmarkUrl, {params});
  }

  public delAllBookmark(key: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.delete<any>(this.delAllBookmarkUrl, {params});
  }

}
