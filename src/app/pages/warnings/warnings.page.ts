import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WarningService } from 'src/app/services/warning.service';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.page.html',
  styleUrls: ['./warnings.page.scss'],
})
export class WarningsPage implements OnInit {

  warnings: Observable<any>;
  warningsdata: any;

  constructor(private warningService: WarningService) { }

  ngOnInit() {
    this.warnings = this.warningService.getWarnings(); // delivers an observable
    this.warnings.subscribe(data => {
      console.log('RAW: ', data);
      this.warningsdata = data;
    });
  }

}
