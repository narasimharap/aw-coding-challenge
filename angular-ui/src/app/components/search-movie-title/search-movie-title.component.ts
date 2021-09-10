import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-search-movie-title',
  templateUrl: './search-movie-title.component.html',
  styleUrls: ['./search-movie-title.component.scss']
})
export class SearchMovieTitleComponent implements OnInit {
  searchTitle$!: any;
  searchTitleForm!: FormGroup;
  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchTitleForm = this.fb.group({
      findByTitle: new FormControl(''),
    });
    this.searchTitle$ = this.searchTitleForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
      ).subscribe((changes: any) => {
        if (changes && changes.findByTitle) {
          this.apiService.titleSubject.next(changes.findByTitle);
        } else {
          this.apiService.titleSubject.next('');
        }
      });
  }
  ngOnDestroy() {
    if (this.searchTitle$) {
      this.searchTitle$.unsubscribe();
    }
  }

}
