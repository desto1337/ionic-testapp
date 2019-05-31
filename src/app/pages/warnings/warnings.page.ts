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

  warnings: Observable<any>;
  warningdata: Warning[] = new Array();
  warningType: WarningType;

  constructor(private warningService: WarningService) { }

  ngOnInit() {
    this.warningType = WarningType.danger;

    this.warnings = this.warningService.getWarnings(); // delivers an observable
    this.warnings.subscribe(data => {
      console.log('RAW: ', data);

      this.warningdata = this.fillInOutputFormat(data, this.warningType);
      this.sortingArrayByDateDescending(this.warningdata);

      console.log('warningdata: ', this.warningdata);
    });
  }

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
