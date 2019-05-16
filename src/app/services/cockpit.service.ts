import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  url = 'localhost:8888/cockpit';
  apiKey = 'c95c6e3009bdd497deb5021db09041'; // Insert your generated API Key here

  constructor(private http: HttpClient) { }

  getArticles() : Observable<any>  {

    // example for collection "get"
    // fetch('/api/collections/get/posts?token=xxtokenxx')
    // .then(res=>res.json())
    // .then(res => console.log(res));

    return this.http.get(`${this.url}?apikey=${this.apiKey}`)
    .pipe(
      map(results => {
        console.log('RAW: ', results);
        // tslint:disable-next-line:no-string-literal
        return results['Search'];
      })
    );
  }
}
