import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowTableComponent } from "./components/show-table/show-table.component";
import { CalculateComponent } from './components/calculate/calculate.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

@NgModule({
  declarations: [
    ShowTableComponent,
    CalculateComponent,
    BookmarksComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowTableComponent,
    CalculateComponent,
    BookmarksComponent
  ]
})
export class ShowModule { }
