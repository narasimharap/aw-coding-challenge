import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  titleSubject = new Subject<any>();
  constructor(private httpClient: HttpClient) { }
  getMoviesList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.url}/getMovies`)
      .pipe(
        retry(1),
        catchError(this.catchError)
      );
  }

  searchByTitle(title: any): Observable<any> {
    if (title && title.length > 0) {
      return this.httpClient.get<any>(`${environment.url}/searchByTitle/${title}`)
        .pipe(
          retry(1),
          catchError(this.catchError)
        );
    } else {
      return this.getMoviesList();
    }
  }

  catchError(error: any) {
    return throwError(error?.error instanceof ErrorEvent ? error?.error?.message :
      `Error Code: ${error?.status}\nMessage: ${error?.message}`);
  }
}