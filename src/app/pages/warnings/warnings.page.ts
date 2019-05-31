import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WarningService, WarningType } from 'src/app/services/warning.service';

export interface Warning {
  date: string;
  type: string;
  headline: string;
  warninghtml: string;
}

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.page.html',
  styleUrls: ['./warnings.page.scss'],
})

export class WarningsPage implements OnInit {

  dangerWarnings: Observable<any>;  // Gefahrenmeldungen
  stormWarnings: Observable<any>; // Unwetter
  floodWarnings: Observable<any>; // Hochwasser
  warningdata: Warning[] = new Array(); // Auszugebendes Array
  warningType: WarningType;

  /* Initialisiert den zugrundeliegenden Webservice mit Warnungsmeldungen */
  constructor(private warningService: WarningService) { }

  /* Bei Seiteninitialisierung werden erstmal nur die Gefahrenmeldungen abgerufen, verarbeitet und angezeigt */
  ngOnInit() {
    this.warningType = WarningType.danger;

    this.dangerWarnings = this.warningService.getDangerWarnings(); // delivers an observable
    this.dangerWarnings.subscribe(data => {
      console.log('RAW-Daten (Gefahrenmeldungen): ', data);

      this.warningdata = this.fillInOutputFormat(data, this.warningType);
      this.sortingArrayByDateDescending(this.warningdata);

      console.log('warningdata: ', this.warningdata);
    });
  }

  /* Webservice-Aufruf. Passend zum angegebenen Meldungstypen wird die passende Webservice Methode aufgerufen und verarbeitet. */
  resolveServiceData(warningType: WarningType) {

    let warningData: Warning[] = new Array();

    switch (warningType) {
      case WarningType.danger: {
        this.dangerWarnings = this.warningService.getDangerWarnings();
        this.dangerWarnings.subscribe(data => {
          console.log('Danger-RAW-Data: ', data);

          warningData = this.fillInOutputFormat(data, this.warningType);
          this.sortingArrayByDateDescending(warningData);

          console.log('warningdata: ', warningData);
        });
        break;
      }
      case WarningType.storm: {
        break;
      }
      case WarningType.flood: {
        break;
      }
    }

    return warningData;
  }

  /* Bereitet vorliegende Response-Daten auf definierte Warning-Ausgabenformat um */
  /* return: Ausgabe-Array, mit jeweiligen Daten */
  fillInOutputFormat(subdata: any, category: WarningType = WarningType.danger) {
    const outputdata: Warning[] = new Array();

    for (const warningItem of subdata) {
      switch (category) {
        case WarningType.danger: {
          const warningData: Warning = {
            date: warningItem.sent,
            type: warningItem.info[0].event,
            headline: warningItem.info[0].headline,
            warninghtml: warningItem.info[0].description,
          };

          outputdata.push(warningData);
          break;
        }
        default: {
          return null;
        }
      }
    }
    return outputdata;
  }

  /* Das Ausgabe-Array wird nach dem Datum absteigend sortiert */
  /* return: Übergebenes Array in geordneter Form */
  sortingArrayByDateDescending(array: Warning[]) {
    // Nach Datum absteigend sortieren (Aktuellstes Datum zuerst)

    // tslint:disable-next-line:no-string-literal
    array.sort((a, b) => {
      const adate = Number(new Date(a.date));
      const bdate = Number(new Date(b.date));
      return bdate - adate;
    });

    return array;
  }

}
