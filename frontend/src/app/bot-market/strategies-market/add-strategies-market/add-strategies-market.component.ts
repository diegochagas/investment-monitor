import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesMarketService
} from 'src/app/shared';

@Component({
  selector: 'app-add-strategies-market',
  templateUrl: './add-strategies-market.component.html',
  styleUrls: ['./add-strategies-market.component.scss']
})
export class AddStrategiesMarketComponent implements OnInit {
  @ViewChild('strategyForm', { static: true }) strategyForm;

  constructor(
    private loadingBarService: LoadingBarService,
    private strategiesMarketService: StrategiesMarketService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-market/strategies/list",
      text: "List Strategies"
    });
  }

  addStrategy(rawForm) {
    let raw = {
      "name": rawForm.name,
      "finPair": rawForm.finPair,
      "iniPair": rawForm.iniPair,
      "midPrice": rawForm.midPrice,
      "wallet": rawForm.wallet,
      "config": {
        "exchange": rawForm.exchange,
        "currencyPair": rawForm.iniPair+rawForm.finPair,
        "order": {
          "stepSize": rawForm.stepSize,
          "maxOrders": rawForm.maxOrders,
          "orderSize": rawForm.orderSize,
          "initialMidPriceType": rawForm.initialMidPriceType,
          "amountOrders": rawForm.amountOrders,
          "defaultSpread": rawForm.defaultSpread,
          "ordersInterval": rawForm.ordersInterval,
          "fractionOrder": {
            "fractionPercent": rawForm.fractionPercent,
            "fractionQuantity": rawForm.fractionQuantity
          },
          "midPriceType": rawForm.midPriceType,
          "percentUpdate": {
            "ask": rawForm.ask,
            "bid": rawForm.bid
          }
        },
        "cryptoMarketPrice": {
          "exchangesInside": rawForm.exchangesInside,
          "exchangesOutside": rawForm.exchangesOutside,
          "forexEnable": rawForm.forexEnable
        },
        "forexMarketPrice": {
          "subscribe": rawForm.subscribe,
          "currencyBase": rawForm.iniPair,
          "currencyQuote": rawForm.finPair
        },
        "referencePrice": {
          "prexBand": rawForm.prexBand,
          "externalPercent": rawForm.externalPercent,
          "internalPercent": rawForm.internalPercent,
          "forexEnable": rawForm.forexEnable
        },
        "global": {
          "statusInterval": rawForm.statusInterval,
          "dataReloadInterval": rawForm.dataReloadInterval
        },
        "exposition": {
          "expLimit": rawForm.expLimit,
          "expLimitStep": rawForm.expLimitStep,
          "expSpread": rawForm.expSpread,
          "sizeMultiply": rawForm.sizeMultiply
        },
        "stopLoss": rawForm.stopLoss
      }
    };

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesMarketService.addStrategy(raw).subscribe(() => {
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
