import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export enum WarningType {
  danger = 'Gefahrenmeldung',
  storm = 'Unwetter',
  flood = 'Flut'
}

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  urlDangerWarnings = 'http://warnung.bund.de/bbk.mowas/gefahrendurchsagen.json';
  urlStormWarnings = 'http://warnung.bund.de/bbk.dwd/unwetter.json';
  urlFloodWarnings = 'http://warnung.bund.de/bbk.wsv/hochwasser.json';

  constructor(private http: HttpClient) { }

  getDangerWarnings() {
    return this.http.get(`${this.urlDangerWarnings}`);
  }

  getStormWarnings() {
    return this.http.get(`${this.urlStormWarnings}`);
  }

  getFloodWarnings() {
    return this.http.get(`${this.urlFloodWarnings}`);
  }
}
