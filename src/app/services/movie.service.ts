import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = '49233cd7'; // Insert your generated API Key here

  constructor(private http: HttpClient) { }

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
    .pipe(
      map(results => {
        console.log('RAW: ', results);
        // tslint:disable-next-line:no-string-literal
        return results['Search'];
      })
    );
  }

  getDetails(id: string) {
    return this.http.get(`${this.url}?i=${encodeURI(id)}&plot=full&apikey=${this.apiKey}`)
  }
}
