import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { Chart, StockChart } from 'angular-highcharts';

import Swal from 'sweetalert2';

import * as moment from 'moment';

import {
  HeaderService,
  DashboardMarketService,
  RobotsMarketService,
  SocketService
} from 'src/app/shared';

@Component({
  selector: 'app-dashboard-market',
  templateUrl: './dashboard-market.component.html',
  styleUrls: ['./dashboard-market.component.scss']
})
export class DashboardMarketComponent implements OnInit, OnDestroy {
  id;
  robotsList;

  displayedColumnsInfo = ['type', 'symbol', 'currency'];
  dataSourceInfo = [
    {
      "type": "bids",
      "symbol": "-- --",
      "currency": "-- --"
    },
    {
      "type": "asks",
      "symbol": "-- --",
      "currency": "-- --"
    },
    {
      "type": "average",
      "symbol": "-- --",
      "currency": "-- --"
    },
    {
      "type": "balance",
      "symbol": "-- --",
      "currency": "-- --"
    }
  ];

  tabs = true;
  tabsArr = ['open', 'canceled', 'executed', 'partially executed'];

  selectedTab = "open";

  displayedColumnsOrders = ['instance', 'pair', 'price', 'currency', 'symbol', 'side', 'fee', 'init', 'updated', 'status'];
  dataSourceOrders = [];

  dataMarket: any = [];
  marketChart;

  dataExposition: any = [];
  expositionChart;

  selectedDate;

  liquidateValue = 0;
  liquidateStrategy = "";

  exposition = { shorts: `${(50).toFixed(2)}%`, longs: `${(50).toFixed(2)}%` };

  midPrice = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardMarketService: DashboardMarketService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private robotsMarketService: RobotsMarketService,
    private router: Router,
    private socketService: SocketService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Dashboard');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({});

    if (!this.id) {
      this.loadingBarService.stop();

      this.loadingBarService.start();

      this.robotsMarketService.robotsList().subscribe((res: any) => {
        this.robotsList = res.data;

        this.loadingBarService.complete();
      });
    } else {
      this.headerService.buttonObjChangeValue({
        url: "/bot-market/dashboard",
        text: "List Robots"
      });

      this.socketService.roomTextChangeValue(`dashboard-market-${this.id}`);

      this.socketService.connect();

      this.socketService.onMessage().subscribe((response: any) => {
        if (response.type == 'indicator') {
          this.dataSourceInfo = [];

          this.dataSourceInfo.push({
            "type": "bids",
            "symbol": response.balance.bids.symbol + ' ' + response.balance.market.symbol,
            "currency": response.balance.bids.currency + ' ' + response.balance.market.currency
          });

          this.dataSourceInfo.push({
            "type": "asks",
            "symbol": response.balance.asks.symbol + ' ' + response.balance.market.symbol,
            "currency": response.balance.asks.currency + ' ' + response.balance.market.currency
          });

          this.dataSourceInfo.push({
            "type": "average",
            "symbol": response.balance.average.symbol + ' ' + response.balance.market.symbol,
            "currency": response.balance.average.currency + ' ' + response.balance.market.currency
          });

          this.dataSourceInfo.push({
            "type": "balance",
            "symbol": response.balance.balance.symbol + ' ' + response.balance.market.symbol,
            "currency": response.balance.balance.currency + ' ' + response.balance.market.currency
          });

          this.midPrice = response.midPrice;
        }

        if (response.type == 'order') {
          this.dataMarket[0].data = [];

          this.dataMarket[1].data = [];

          let qtyAsks = 0;
          let qtyBids = 0;

          response.asks.forEach(row => {
            this.dataMarket[0].data.push(row.quantity);

            qtyAsks = qtyAsks + Math.abs(row.quantity);
          });

          response.bids.forEach(row => {
            this.dataMarket[1].data.push(row.quantity);

            qtyBids = qtyBids + row.quantity;
          });

          let totBidsAsks = qtyAsks + qtyBids;

          this.exposition = { shorts: `${((qtyAsks/totBidsAsks)*100).toFixed(2)}%`, longs: `${((qtyBids/totBidsAsks)*100).toFixed(2)}%` };

          this.marketChart.ref$.subscribe((chart) => {
            this.dataMarket[0].data.sort((a, b) => { return a-b });

            this.dataMarket[1].data.sort((a, b) => { return b-a });

            for (let i = 0; i < this.dataMarket.length; i++) {
              chart.series[i].update({
                data: this.dataMarket[i].data
              });
            }

            chart.hideLoading();
          });
        }
      });

      this.dataMarket = [
        {
          name: 'Asks',
          data: [],
          colorIndex: 8
        },
        {
          name: 'Bids',
          data: [],
          colorIndex: 0
        }
      ];

      this.dataMarket[0].data.sort((a, b) => { return a-b });

      this.dataMarket[1].data.sort((a, b) => { return b-a });

      let yAxis: any = [
        {
          labels: {
            formatter: function () {
              return Math.abs(this.value);
            }
          }
        }
      ];

      let tooltip: any = {
        formatter: function () {
          return `<b>${this.series.name}:</b> ${Math.abs(this.point.y)}`;
        }
      };

      this.marketChart = new Chart({
        chart: {
          height: 355,
          type: 'bar'
        },
        rangeSelector: {
          selected: 4,
          buttons: [
            {
              type: 'week',
              count: 1,
              text: '1w',
            },
            {
              type: 'week',
              count: 2,
              text: '2w',
            },
            {
              type: 'week',
              count: 3,
              text: '3w',
            },
            {
              type: 'month',
              count: 1,
              text: '1m',
            },
            {
              type: 'month',
              count: 3,
              text: '3m'
            },
            {
              type: 'all',
              text: 'All'
            }
          ]
        },
        title: {
          text: 'Orders'
        },
        credits: {
          enabled: false
        },
        yAxis: yAxis,
        xAxis: {
          labels: {
            enabled: false
          }
        },
        tooltip: tooltip,
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: this.dataMarket
      });

      this.marketChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.selectedDate = { startDate: moment().subtract(1, 'days'), endDate: moment() };
    }
  }

  async initRequests() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let dtIni = moment(this.selectedDate.startDate).valueOf();
    let dtFin = moment(this.selectedDate.endDate).valueOf();

    let robots:any = await this.robotsMarketService.robotsList().toPromise();

    if (robots.data[0].status == 'STALLED') {
      Swal.fire({
        text: robots.data[0].reason,
        heightAuto: false
      });

      this.liquidateStrategy = 'no-strategy';
    } else {
      this.liquidateStrategy = robots.data[0].strategy.name;
    }

    let orders:any = await this.dashboardMarketService.orderList(this.id, '?status=OPEN').toPromise();

    orders.data.forEach(row => {
      this.dataSourceOrders.push({
        "instance": row.instance,
        "pair": row.market,
        "price": row.price,
        "currency": row.quantity + ' ' + row.currency,
        "symbol": row.quantitySymbol + ' ' + row.symbol,
        "side": row.side,
        "fee": row.fee,
        "init": row.timestamp,
        "updated": row.timestampUpdate,
        "status": row.status
      });
    });

    this.loadingBarService.complete();
  }

  async listOrders(params) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let orders:any = await this.dashboardMarketService.orderList(this.id, params).toPromise();

    this.dataSourceOrders = [];

    orders.data.forEach(row => {
      this.dataSourceOrders.push({
        "instance": row.instance,
        "pair": row.market,
        "price": row.price,
        "currency": row.quantity + ' ' + row.currency,
        "symbol": row.quantitySymbol + ' ' + row.symbol,
        "side": row.side,
        "fee": row.fee,
        "init": row.timestamp,
        "updated": row.timestampUpdate,
        "status": row.status
      });
    });

    this.loadingBarService.complete();
  }

  ngOnDestroy() {
    this.loadingBarService.stop();

    this.socketService.disconnect();
  }

  selectedRobot(instanceId) {
    this.router.navigate([`/bot-market/dashboard/${instanceId}`]);
  }

  setSelectedDate(obj) {
    this.selectedDate = obj;

    this.initRequests();
  }

  liquidateOrder() {
    let raw = {
      "instance": this.id,
      "side": "BUY",
      "strategy": {
        "name": this.liquidateStrategy,
        "version": 1
      },
      "value": this.liquidateValue
    };

    Swal.fire({
      text: 'Are you sure to settle orders?',
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if (choice.value) {
        this.loadingBarService.stop();

        this.loadingBarService.start();

        this.dashboardMarketService.liquidateOrder(raw).subscribe((res: any) => {
          Swal.fire({
            text: 'Orders settled.',
            heightAuto: false
          });

          this.loadingBarService.complete();
        }, err => {
          if (err.error) {
            if (err.error.message) {
              Swal.fire({
                text: err.error.message,
                heightAuto: false
              });
            }
          }

          this.loadingBarService.complete();
        });
      }
    });
  }

  setTab(tab) {
    tab = tab.replace(' ', '_').toUpperCase();

    this.listOrders(`?status=${tab}`);

    this.selectedTab = tab;
  }
}
