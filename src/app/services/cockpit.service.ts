import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  url = 'http://localhost:8888/api/collections/get/articles';
  apiKey = 'd751f03dbe9fadce6b52368abb506c'; // Master API-Key

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {

    // example for collection "get"
    // fetch('/api/collections/get/posts?token=xxtokenxx')
    // .then(res=>res.json())
    // .then(res => console.log(res));

    return this.http.get(`${this.url}?token=${this.apiKey}`)
      .pipe(
        map(results => {
          console.log('RAW: ', results);
          // tslint:disable-next-line:no-string-literal
          results['entries'].forEach(entry => {
            // to do
          });
          // tslint:disable-next-line:no-string-literal
          return results['entries'];
        })
      );
  }
}
