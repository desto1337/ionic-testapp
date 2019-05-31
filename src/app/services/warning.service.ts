import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export enum WarningType {
  danger = 'Gefahrenmeldung',
  test = 'Test'
}

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  url = 'http://warnung.bund.de/bbk.mowas/gefahrendurchsagen.json';

  constructor(private http: HttpClient) { }

  getWarnings() {
    return this.http.get(`${this.url}`);
  }
}
