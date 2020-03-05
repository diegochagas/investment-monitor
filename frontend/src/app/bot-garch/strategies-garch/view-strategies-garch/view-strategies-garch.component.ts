import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesGarchService
} from 'src/app/shared';

@Component({
  selector: 'app-view-strategies-garch',
  templateUrl: './view-strategies-garch.component.html',
  styleUrls: ['./view-strategies-garch.component.scss']
})
export class ViewStrategiesGarchComponent implements OnInit {
  id;

  formData;

  constructor(
    private loadingBarService: LoadingBarService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private strategiesGarchService: StrategiesGarchService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-garch/strategies/list",
      text: "List Strategies"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesGarchService.getStrategy(this.id).subscribe((response) => {
      this.formData = {
        "name": response['data'].name,
        "exchange": response['data'].config.exchange,
        "candleTime": response['data'].config.candleTime,
        "usd": response['data'].config.usd,
        "tradeWindow": response['data'].config.tradeWindow,
        "orderType": response['data'].config.orderType,
        "expose": response['data'].config.expose,
        "fee": response['data'].config.fee,
        "stop": response['data'].config.stop,
        "maxSamples": response['data'].config.maxSamples,
        "iniPair": response['data'].iniPair,
        "finPair": response['data'].finPair,
        "takeProfit": response['data'].config.takeProfit,
        "idleMinutesAfterStop": response['data'].config.idleMinutesAfterStop,
        "stopLimit": response['data'].config.stopLimit,
        "stopLimitTrigger": response['data'].config.stopLimitTrigger
      };

      this.loadingBarService.complete();
    });
  }

  editStrategy(rawForm) {
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
        "maxSamples": rawForm.maxSamples,
        "takeProfit": rawForm.takeProfit,
        "idleMinutesAfterStop": rawForm.idleMinutesAfterStop,
        "stopLimit": rawForm.stopLimit,
        "stopLimitTrigger": rawForm.stopLimitTrigger
      }
    };

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesGarchService.editStrategy(raw).subscribe(() => {
      Swal.fire({
        text: 'Strategy edited with new version.',
        heightAuto: false
      });

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
