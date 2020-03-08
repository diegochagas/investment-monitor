import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesMarketService
} from 'src/app/shared';

@Component({
  selector: 'app-view-strategies-market',
  templateUrl: './view-strategies-market.component.html',
  styleUrls: ['./view-strategies-market.component.scss']
})
export class ViewStrategiesMarketComponent implements OnInit {
  id;

  formData;

  constructor(
    private loadingBarService: LoadingBarService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private strategiesMarketService: StrategiesMarketService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-market/strategies/list",
      text: "List Strategies"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesMarketService.getStrategy(this.id).subscribe((response) => {
      this.formData = {
        amountOrders: response['data'].config.order.amountOrders,
        ask: response['data'].config.order.percentUpdate.ask,
        bid: response['data'].config.order.percentUpdate.bid,
        dataReloadInterval: response['data'].config.global.dataReloadInterval,
        defaultSpread: response['data'].config.order.defaultSpread,
        exchange: response['data'].config.exchange,
        exchangesInside: response['data'].config.cryptoMarketPrice.exchangesInside,
        exchangesOutside: response['data'].config.cryptoMarketPrice.exchangesOutside,
        expLimit: response['data'].config.exposition.expLimit,
        expLimitStep: response['data'].config.exposition.expLimitStep,
        expSpread: response['data'].config.exposition.expSpread,
        externalPercent: response['data'].config.referencePrice.externalPercent,
        finPair: response['data'].finPair,
        forexEnable: response['data'].config.referencePrice.forexEnable,
        fractionPercent: response['data'].config.order.fractionOrder.fractionPercent,
        fractionQuantity: response['data'].config.order.fractionOrder.fractionQuantity,
        iniPair: response['data'].iniPair,
        initialMidPriceType: response['data'].config.order.initialMidPriceType,
        internalPercent: response['data'].config.referencePrice.internalPercent,
        maxOrders: response['data'].config.order.maxOrders,
        midPrice: response['data'].midPrice,
        midPriceType: response['data'].config.order.midPriceType,
        name: response['data'].name,
        orderSize: response['data'].config.order.orderSize,
        ordersInterval: response['data'].config.order.ordersInterval,
        prexBand: response['data'].config.referencePrice.prexBand,
        sizeMultiply: response['data'].config.exposition.sizeMultiply,
        statusInterval: response['data'].config.global.statusInterval,
        stepSize: response['data'].config.order.stepSize,
        stopLoss: response['data'].config.stopLoss,
        subscribe: response['data'].config.forexMarketPrice.subscribe,
        wallet: response['data'].wallet
      };

      this.loadingBarService.complete();
    });
  }

  editStrategy(rawForm) {
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

    this.strategiesMarketService.editStrategy(raw).subscribe(() => {
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
