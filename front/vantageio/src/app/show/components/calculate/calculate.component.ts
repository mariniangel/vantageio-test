import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { StoreAnalize } from "../../models/store-analize";



@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {
  public hidden: string = "hidden";
  public resGenres: StoreAnalize[] = [{
      name: "",
      count: 0
    },];
  public processing: string = "";
  public errorMessage: string = "";

  constructor(private apiservice: ApiService) {
    //console.log("ShowTableComponent::constructor()");
  }

  ngOnInit() {
    //this.apiservice.getShowData().subscribe(result => (this.result = result));
  }

  calculateGenres() {
    this.processing = "Processing ...";
    this.apiservice.getGenres().subscribe({
      next: resGenres => {
          this.resGenres = resGenres;
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
}
