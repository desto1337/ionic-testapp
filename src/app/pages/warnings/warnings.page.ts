import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WarningService } from 'src/app/services/warning.service';

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

  warnings: Observable<any>;
  warningdata: Warning[] = new Array();

  constructor(private warningService: WarningService) { }

  ngOnInit() {
    this.warnings = this.warningService.getWarnings(); // delivers an observable
    this.warnings.subscribe(data => {
      console.log('RAW: ', data);

      // const dataArray = [];
      // konvertiere Object-Response in Array
      // Object.keys(data).map((key) => {
      //   dataArray.push({ [key]: data[key] });
      //   return dataArray;
      // });

      // console.log('dataArray: ', dataArray);

      for (const warningItem of data) {
        // console.log(warningItem);

        const warningData: Warning = {
          date: warningItem.sent,
          type: warningItem.info[0].event,
          headline: warningItem.info[0].headline,
          warninghtml: warningItem.info[0].description,
        };
        this.warningdata.push(warningData);
      }

      // this.warningdata = data;
      this.sortingArrayByDateDescending(this.warningdata);
      console.log('warningdata: ', this.warningdata);
    });
  }

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
