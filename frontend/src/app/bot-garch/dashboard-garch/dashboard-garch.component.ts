import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { StockChart } from 'angular-highcharts';

import { Router, ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import * as moment from 'moment';

import {
  DashboardGarchService,
  ExportExcelService,
  HeaderService,
  RobotsGarchService,
  SocketService
} from 'src/app/shared';

@Component({
  selector: 'app-dashboard-garch',
  templateUrl: './dashboard-garch.component.html',
  styleUrls: ['./dashboard-garch.component.scss']
})
export class DashboardGarchComponent implements OnInit, OnDestroy {
  id;
  robotsList;

  displayedColumns = ['id', 'type', 'status', 'price in', 'price out', 'profit', 'quantity', 'time in', 'time out'];
  dataSource = [];

  tabs = true;
  tabsArr = ['open', 'new', 'close', 'stop', 'cancel'];

  selectedTab = "open";

  dataGarch: any = [];
  garchChart;
  rangeStamps = [];
  labelsBuySell = [];

  selectedExchange = localStorage.getItem('exchange');
  selectedCoinApi = localStorage.getItem('coinApi');
  selectedTradeWindow = localStorage.getItem('tradeWindow');

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardGarchService: DashboardGarchService,
    private exportExcelService: ExportExcelService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private robotsGarchService: RobotsGarchService,
    private router: Router,
    private socketService: SocketService,
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

      this.robotsGarchService.robotsList().subscribe((res: any) => {
        this.robotsList = res.data;

        this.loadingBarService.complete();
      });
    } else {
      this.headerService.buttonObjChangeValue({
        url: "/bot-garch/dashboard",
        text: "List Robots"
      });

      this.socketService.roomTextChangeValue(`dashboard-garch-${this.id}`);

      this.socketService.connect();

      this.socketService.onMessage().subscribe((response: any) => { });

      this.dataGarch = [
        {
          name: 'H',
          data: [],
          step: true,
          colorIndex: 0,
          tooltip: {
            valueDecimals: 2
          }
        },
        {
          name: 'L',
          data: [],
          step: true,
          colorIndex: 0,
          tooltip: {
            valueDecimals: 2
          }
        },
        {
          type: 'candlestick',
          name: 'Price',
          data: [],
          step: true,
          colorIndex: 1,
          tooltip: {
            valueDecimals: 2
          }
        }
      ];

      this.garchChart = new StockChart({
        chart: {
          events: {
            redraw: () => {
              this.labelsBuySell.forEach((labelId) => {
                let labelCached = window[`${labelId}`];

                if (labelCached) {
                  let chart = this.garchChart.ref;

                  let point = _.filter(chart.series[2].points, (item) => {
                    return item.open == labelCached.open && item.high == labelCached.high && item.low == labelCached.low && item.close == labelCached.close;
                  });

                  if (point.length) {
                    labelCached.label.css({
                      display: 'inherit'
                    }).attr({
                      x: point[0].plotX,
                      y: point[0].plotY
                    });
                  } else {
                    labelCached.label.css({
                      display: 'none'
                    });
                  }
                }
              });
            }
          }
        },
        rangeSelector: {
          selected: 1,
          buttons: [
            {
              type: 'hour',
              count: 1,
              text: '1h',
            },
            {
              type: 'hour',
              count: 3,
              text: '3h',
            },
            {
              type: 'hour',
              count: 6,
              text: '6h',
            },
            {
              type: 'all',
              text: 'All'
            }
          ]
        },
        title: {
          text: 'BOT Garch Price'
        },
        credits: {
          enabled: false
        },
        series: this.dataGarch
      });

      this.garchChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.initRequests();
    }
  }

  ngOnDestroy() {
    this.loadingBarService.stop();

    this.socketService.disconnect();
  }

  async initRequests() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let orders:any = await this.dashboardGarchService.getOrder(this.id, `?exchange=${this.selectedExchange}&status=OPEN`).toPromise();

    orders.data.forEach(row => {
      this.dataSource.push({
        "id": (row.content.exId) ? row.content.exId : '-- --',
        "type": (row.content.type) ? row.content.type : '-- --',
        "status": (row.content.status) ? row.content.status : '-- --',
        "price in": (row.content.priceIn) ? row.content.priceIn : '-- --',
        "price out": (row.content.priceOut) ? row.content.priceOut : '-- --',
        "profit": (row.content.priceOut) ? ((row.content.type).toUpperCase() === 'BUY') ? ((row.content.priceOut/row.content.priceIn) -1).toFixed(3) + '%' : ((row.content.priceIn/row.content.priceOut) -1).toFixed(3) + '%' : '-- --',
        "quantity": (row.content.qty) ? row.content.qty : '-- --',
        "time in": (row.content.timeIn) ? row.content.timeIn : '-- --',
        "time out": (row.content.timeOut) ? row.content.timeOut : '-- --'
      });
    });

    let dtFin = new Date(Date.now() + 864e5).getTime();
    let dtIni = new Date(Date.now() + 864e5 * -5).getTime();

    let bands:any = await this.dashboardGarchService.getBand(`${this.selectedTradeWindow}/?exchange=${this.selectedExchange}&dtIni=${dtIni}&dtFim=${dtFin}`).toPromise();

    for (let i = 0; i < bands.data.length; i++) {
      this.dataGarch[0].data.push([Number(bands.data[i].t), Number(bands.data[i].h)]);

      this.dataGarch[1].data.push([Number(bands.data[i].t), Number(bands.data[i].l)]);
    }

    let candles:any = await this.dashboardGarchService.getCandles(`?symbolId=${this.selectedCoinApi}&period=${this.selectedTradeWindow}&start=${dtIni}&end=${dtFin}&limit=1000`).toPromise();

    for (let i = 0; i < candles.data.length; i++) {
      let timestamp = new Date(candles.data[i].time_period_start).getTime();

      this.dataGarch[2].data.push([timestamp, candles.data[i].price_open, candles.data[i].price_high, candles.data[i].price_low, candles.data[i].price_close]);

      this.rangeStamps.push({
        startTime: new Date(candles.data[i].time_period_start).getTime(),
        endTime: new Date(candles.data[i].time_period_end).getTime(),
        price_open: candles.data[i].price_open,
        price_high: candles.data[i].price_high,
        price_low: candles.data[i].price_low,
        price_close: candles.data[i].price_close
      });
    }

    this.dataGarch[0].data.sort();

    this.dataGarch[1].data.sort();

    this.dataGarch[2].data.sort();

    this.garchChart.ref$.subscribe((chart) => {
      chart.series[0].update({
        data: this.dataGarch[0].data
      });

      chart.series[1].update({
        data: this.dataGarch[1].data
      });

      chart.series[2].update({
        data: this.dataGarch[2].data
      });

      chart.hideLoading();
    });

    this.loadingBarService.complete();
  }

  async listOrders(params) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let orders:any = await this.dashboardGarchService.getOrder(this.id, params).toPromise();

    this.dataSource = [];

    orders.data.forEach(row => {
      this.dataSource.push({
        "id": (row.content.exId) ? row.content.exId : '-- --',
        "type": (row.content.type) ? row.content.type : '-- --',
        "status": (row.content.status) ? row.content.status : '-- --',
        "price in": (row.content.priceIn) ? row.content.priceIn : '-- --',
        "price out": (row.content.priceOut) ? row.content.priceOut : '-- --',
        "profit": (row.content.priceOut) ? ((row.content.type).toUpperCase() === 'BUY') ? ((row.content.priceOut/row.content.priceIn) -1).toFixed(3) + '%' : ((row.content.priceIn/row.content.priceOut) -1).toFixed(3) + '%' : '-- --',
        "quantity": (row.content.qty) ? row.content.qty : '-- --',
        "time in": (row.content.timeIn) ? row.content.timeIn : '-- --',
        "time out": (row.content.timeOut) ? row.content.timeOut : '-- --'
      });
    });

    this.loadingBarService.complete();
  }

  selectedRobot(instanceId) {
    this.router.navigate([`/bot-garch/dashboard/${instanceId}`]);

    this.robotsList.forEach((robot) => {
      if (robot.instanceId == instanceId) {
        localStorage.setItem('exchange', (robot.strategy.config.exchangeName).toUpperCase());

        this.selectedExchange = localStorage.getItem('exchange');

        localStorage.setItem('coinApi', (robot.strategy.config.exchangeOptions.coinApiRest).toUpperCase());

        this.selectedCoinApi = localStorage.getItem('coinApi');

        localStorage.setItem('tradeWindow', (robot.strategy.config.tradeWindow).toUpperCase());

        this.selectedTradeWindow = localStorage.getItem('tradeWindow');
      }
    });
  }

  setTab(tab) {
    tab = tab.replace(' ', '_').toUpperCase();

    this.listOrders(`?exchange=${this.selectedExchange}&status=${tab}`);

    this.selectedTab = tab;
  }

  addLabel(obj) {
    let chart = this.garchChart.ref;

    chart.xAxis[0].setExtremes(new Date(obj['time in']).setHours(new Date(obj['time in']).getHours()-1.5), new Date(obj['time in']).setHours(new Date(obj['time in']).getHours()+1.5));

    let nameLabel = `label${obj.id}`;

    setTimeout(() => {
      let fltr = _.filter(this.rangeStamps, (item) => {
        return item.startTime < obj['time in'] && item.endTime > obj['time in'];
      });

      if (fltr.length) {
        let point = _.filter(chart.series[2].points, (item) => {
          return item.open == fltr[0].price_open && item.high == fltr[0].price_high && item.low == fltr[0].price_low && item.close == fltr[0].price_close;
        });

        let condition = _.filter(this.labelsBuySell, (item) => { return item == nameLabel; });

        if (condition.length == 0 && point.length) {
          window[nameLabel] = {
            label: chart.renderer.label(point[0].close, point[0].plotX, point[0].plotY, 'callout', point[0].plotX + chart.plotLeft, point[0].plotY + chart.plotTop).css({
              color: '#FFFFFF'
            }).attr({
              'stroke-width': 2,
              fill: (obj.type == "BUY") ? 'rgba(0, 130, 45, 0.75)' : 'rgba(220, 30, 30, 0.75)',
              padding: 5,
              zIndex: 6,
              r: 5
            }).add(),
            open: point[0].open,
            high: point[0].high,
            low: point[0].low,
            close: point[0].close
          };

          this.labelsBuySell.push(nameLabel);
        }
      }
    }, 500);
  }

  async downloadXlsx() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let dataSource = [];

    let ordersClose:any = await this.dashboardGarchService.getOrder(this.id, `?exchange=${this.selectedExchange}&status=CLOSE`).toPromise();

    ordersClose.data.forEach(row => {
      dataSource.push({
        "id": (row.content.exId) ? row.content.exId : '-- --',
        "type": (row.content.type) ? row.content.type : '-- --',
        "status": (row.content.status) ? row.content.status : '-- --',
        "price in": (row.content.priceIn) ? row.content.priceIn : '-- --',
        "price out": (row.content.priceOut) ? row.content.priceOut : '-- --',
        "profit": (row.content.priceOut) ? ((row.content.type).toUpperCase() === 'BUY') ? ((row.content.priceOut/row.content.priceIn) -1).toFixed(3) + '%' : ((row.content.priceIn/row.content.priceOut) -1).toFixed(3) + '%' : '-- --',
        "quantity": (row.content.qty) ? row.content.qty : '-- --',
        "time in": (row.content.timeIn) ? moment(row.content.timeIn).format('L LTS') : '-- --',
        "time out": (row.content.timeOut) ? moment(row.content.timeOut).format('L LTS') : '-- --'
      });
    });

    let ordersStop:any = await this.dashboardGarchService.getOrder(this.id, `?exchange=${this.selectedExchange}&status=STOP`).toPromise();

    ordersStop.data.forEach(row => {
      dataSource.push({
        "id": (row.content.exId) ? row.content.exId : '-- --',
        "type": (row.content.type) ? row.content.type : '-- --',
        "status": (row.content.status) ? row.content.status : '-- --',
        "price in": (row.content.priceIn) ? row.content.priceIn : '-- --',
        "price out": (row.content.priceOut) ? row.content.priceOut : '-- --',
        "profit": (row.content.priceOut) ? ((row.content.type).toUpperCase() === 'BUY') ? ((row.content.priceOut/row.content.priceIn) -1).toFixed(3) + '%' : ((row.content.priceIn/row.content.priceOut) -1).toFixed(3) + '%' : '-- --',
        "quantity": (row.content.qty) ? row.content.qty : '-- --',
        "time in": (row.content.timeIn) ? moment(row.content.timeIn).format('L LTS') : '-- --',
        "time out": (row.content.timeOut) ? moment(row.content.timeOut).format('L LTS') : '-- --'
      });
    });

    this.exportExcelService.exportAsExcelFile(dataSource, 'ordersGarch');

    this.loadingBarService.complete();
  }

}
