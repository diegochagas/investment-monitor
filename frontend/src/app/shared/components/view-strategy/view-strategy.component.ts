import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { ViewStrategyService } from '../../services';

@Component({
  selector: 'app-view-strategy',
  templateUrl: './view-strategy.component.html',
  styleUrls: ['./view-strategy.component.scss']
})
export class ViewStrategyComponent implements OnInit, OnChanges {
  @ViewChild('content', { static: true }) content: ElementRef;

  @Input() midPrice;
  @Input() wallet;
  @Input() config;

  amountOrders = [];

  maxOrders;
  iniPair;
  walletConverted;
  maxSpread;

  num = 0;

  constructor(
    private viewStrategyService: ViewStrategyService
  ) { }

  ngOnInit() {
    this.viewStrategyService.positionTop.subscribe((num) => {
      this.num = num;

      this.floatViewStrategy();
    });
  }

  ngOnChanges(changes) {
    if (changes.config) {
      this.amountOrders = [];

      this.wallet = changes.config.currentValue['wallet'];
      this.walletConverted = ((1/this.midPrice)*this.wallet).toFixed(8);

      this.maxOrders = changes.config.currentValue['maxOrders'];
      this.iniPair = (changes.config.currentValue['iniPair']) ? changes.config.currentValue['iniPair'] : 'BTC';
      this.maxSpread = (changes.config.currentValue['maxSpread']*100).toFixed(0);

      let defaultSpread = changes.config.currentValue['defaultSpread'];
      let stepSize = changes.config.currentValue['stepSize'];
      let ordersInterval = changes.config.currentValue['ordersInterval'];
      let orderSize = changes.config.currentValue['orderSize'];

      let fractionPercent = changes.config.currentValue['fractionPercent'];
      let fractionQuantity = changes.config.currentValue['fractionQuantity'];

      let ask = this.midPrice;
      let bid = this.midPrice;

      let am_ask = this.wallet*orderSize;
      let am_bid = this.wallet*orderSize;

      let cf_ask = [[]];
      let cf_bid = [[]];

      for (let i = 0; i < changes.config.currentValue['amountOrders']; i++) {
        if (i == 0) {
          ask = (this.midPrice+(this.midPrice*(defaultSpread/100)));
          bid = (this.midPrice-(this.midPrice*(defaultSpread/100)));

          for (let ii = 0; ii < fractionQuantity; ii++) {
            cf_ask[0].push({ crypto: ((1/ask)*((this.wallet*fractionPercent)/fractionQuantity)).toFixed(8), amount: (this.wallet*fractionPercent)/fractionQuantity });

            cf_bid[0].push({ crypto: ((1/bid)*((this.wallet*fractionPercent)/fractionQuantity)).toFixed(8), amount: (this.wallet*fractionPercent)/fractionQuantity });
          }
        } else {
          ask = ask+(this.midPrice*stepSize);
          bid = bid-(this.midPrice*stepSize);

          am_ask = am_ask+(am_ask*ordersInterval);
          am_bid = am_bid+(am_bid*ordersInterval);

          let nw_ask = [];
          let nw_bid = [];

          for (let ii = 0; ii < fractionQuantity; ii++) {
            nw_ask.push({ crypto: ((1/ask)*(cf_ask[i-1][ii].amount+(cf_ask[i-1][ii].amount*ordersInterval))).toFixed(8), amount: cf_ask[i-1][ii].amount+(cf_ask[i-1][ii].amount*ordersInterval) });

            nw_bid.push({ crypto: ((1/bid)*(cf_bid[i-1][ii].amount+(cf_bid[i-1][ii].amount*ordersInterval))).toFixed(8), amount: cf_bid[i-1][ii].amount+(cf_bid[i-1][ii].amount*ordersInterval) });
          }

          cf_ask.push(nw_ask);

          cf_bid.push(nw_bid);
        }

        this.amountOrders.push({
          ask: ask.toFixed(2),
          bid: bid.toFixed(2),
          am_ask: ((1/ask)*am_ask).toFixed(8),
          am_bid: ((1/bid)*am_bid).toFixed(8),
          cc_ask: am_ask,
          cc_bid: am_bid,
          cf_ask: cf_ask,
          cf_bid: cf_bid,
        });
      }

      this.floatViewStrategy();
    }
  }

  floatViewStrategy() {
    if (this.content.nativeElement.offsetHeight > document.documentElement.scrollHeight) {
      this.content.nativeElement.style.top = '0px';
    } else {
      this.content.nativeElement.style.top = this.num+'px';
    }
  }

}
