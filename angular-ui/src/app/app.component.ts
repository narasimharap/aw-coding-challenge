import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mvList$!: any;
  searchTitle$!: any;
  moviesList: any;
  columnDefs = [
    { field: 'ID', sortable: true, filter: true },
    { field: 'Title', sortable: true, filter: true },
    { field: 'Year', sortable: true, filter: true },
    { field: 'Rating', sortable: true, filter: true }
  ];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getMoviesList();
    this.searchByTitle();
  }

  getMoviesList() {
    this.mvList$ = this.apiService.getMoviesList()
      .subscribe((response: any) => {
        this.moviesList = response;
      }, err => { window.alert(err); });
  }

  searchByTitle() {
    this.searchTitle$ = this.apiService.titleSubject.asObservable()
      .pipe(
        switchMap((response: any) => {
          return this.apiService.searchByTitle(response || '');
        }))
      .subscribe(result => {
        this.moviesList = result;
      }, err => { window.alert(err); });
  }
  ngOnDestroy() {
    if (this.mvList$) {
      this.mvList$.unsubscribe();
    }
    if (this.searchTitle$) {
      this.searchTitle$.unsubscribe();
    }
  }
}
