import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesGarchService
} from 'src/app/shared';

@Component({
  selector: 'app-add-strategies-garch',
  templateUrl: './add-strategies-garch.component.html',
  styleUrls: ['./add-strategies-garch.component.scss']
})
export class AddStrategiesGarchComponent implements OnInit {
  @ViewChild('strategyForm', { static: true }) strategyForm;

  constructor(
    private loadingBarService: LoadingBarService,
    private strategiesGarchService: StrategiesGarchService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-garch/strategies/list",
      text: "List Strategies"
    });
  }

  addStrategy(rawForm) {
    let raw = {
      "name": rawForm.name,
      "iniPair": rawForm.iniPair,
      "finPair": rawForm.finPair,
      "config": {
        "exchange": rawForm.exchange,
        "candleTime": rawForm.candleTime,
        "usd": rawForm.usd,
        "tradeWindow": rawForm.tradeWindow,
        "orderType": rawForm.orderType,
        "expose": rawForm.expose,
        "fee": rawForm.fee,
        "stop": rawForm.stop,
        "takeProfit": rawForm.takeProfit,
        "idleMinutesAfterStop": rawForm.idleMinutesAfterStop,
        "stopLimit": rawForm.stopLimit,
        "stopLimitTrigger": rawForm.stopLimitTrigger
      }
    };

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesGarchService.addStrategy(raw).subscribe(() => {
      Swal.fire({
        text: 'Strategy registered.',
        heightAuto: false
      });

      this.strategyForm.resetForm();

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
