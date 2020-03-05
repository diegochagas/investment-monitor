import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { Chart } from 'angular-highcharts';

import * as _ from 'lodash';

import Swal from 'sweetalert2';

import * as moment from 'moment';

import {
  DashboardTelegramService,
  GroupsGeneralService,
  HeaderService,
  RobotsTelegramService,
  SocketService
} from 'src/app/shared';

@Component({
  selector: 'app-dashboard-telegram',
  templateUrl: './dashboard-telegram.component.html',
  styleUrls: ['./dashboard-telegram.component.scss']
})
export class DashboardTelegramComponent implements OnInit, OnDestroy {
  id;
  robotsList;

  tabs = true;
  tabsArr = ['open', 'gain', 'loss'];

  selectedTab = "open";

  date = new Date();
  month = 0;

  dataPerformance: any = [];
  dataResults: any = [];
  dataEarnings: any = [];
  dataBalance: any = [];

  performanceChart;
  resultsChart;
  earningsChart;
  balanceChart;

  displayedColumnsInfo = ['type', 'total'];
  dataSourceInfo = [
    {
      "type": "Period Trades",
      "total": "-- --"
    },
    {
      "type": "Active Trades",
      "total": "-- --"
    },
    {
      "type": "Finished Trades",
      "total": "-- --"
    },
    {
      "type": "Gains",
      "total": "-- --"
    },
    {
      "type": "Losses",
      "total": "-- --"
    }
  ];

  displayedColumnsOperations = ['id', 'opening', 'closing', 'pair', 'ranking', 'group', 'exchange', 'entry price', 'amount', 'total', 'sl', 't1/t2/t3', 'status', 'result', 'duration', 'mep', 'men', 'delete'];
  dataSourceOperations = [];

  groupsList = [];
  selectedGroup;

  selectedDate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardTelegramService: DashboardTelegramService,
    private groupsGeneralService: GroupsGeneralService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private robotsTelegramService: RobotsTelegramService,
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

      this.robotsTelegramService.robotsList().subscribe((res: any) => {
        this.robotsList = res.data;

        this.loadingBarService.complete();
      });
    } else {
      this.headerService.buttonObjChangeValue({
        url: "/bot-telegram/dashboard",
        text: "List Robots"
      });

      this.socketService.roomTextChangeValue(`dashboard-telegram-${this.id}`);

      this.socketService.connect();

      this.socketService.onMessage().subscribe((response: any) => { });

      this.dataPerformance = [
        {
          type: 'areaspline',
          name: 'no-name',
          data: []
        }
      ];

      this.performanceChart = new Chart({
        chart: {
          height: 355,
          zoomType: 'x',
          scrollablePlotArea: {
            scrollPositionX: 1
          }
        },
        title: {
          text: 'GROUP TELEGRAM PERFORMANCE'
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value: %d/%m %H:%M}'
          }
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: ' BTC'
        },
        series: this.dataPerformance,
        credits: {
          enabled: false
        }
      });

      this.performanceChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.dataResults = [
        {
          showInLegend: false,
          name: 'Results',
          data: [1, 3, 7, 5, -1, 3, 1, 4]
        }
      ];

      this.resultsChart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Results'
        },
        xAxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez']
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          valueSuffix: '%'
        },
        credits: {
          enabled: false
        },
        series: this.dataResults
      });

      this.resultsChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.dataBalance = [
        {
          colorByPoint: true,
          data: [
            {
              name: 'Binance',
              y: 63.41,
              sliced: true,
              selected: true
            },
            {
              name: 'Bitmex',
              y: 12.84
            },
            {
              name: 'Bitfinex',
              y: 11.85
            },
            {
              name: 'Kraken',
              y: 2.72
            },
            {
              name: 'Bitstamp',
              y: 5.18
            }
          ]
        }
      ];

      this.balanceChart = new Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Exchange Balance'
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        credits: {
          enabled: false
        },
        series: this.dataBalance
      });

      this.balanceChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.dataEarnings = [
        {
          showInLegend: false,
          name: 'Earning',
          data: [1, 2, 2.4, 5, 6, 7.2, 8.9, 11]
        }
      ];

      this.earningsChart = new Chart({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Accumulated Earnings'
        },
        xAxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez']
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          valueSuffix: '%'
        },
        credits: {
          enabled: false
        },
        series: this.dataEarnings
      });

      this.earningsChart.ref$.subscribe((chart) => {
        chart.showLoading();
      });

      this.selectedDate = { startDate: moment().subtract(1, 'days'), endDate: moment() };
    }
  }

  ngOnDestroy() {
    this.loadingBarService.stop();

    this.socketService.disconnect();
  }

  async initRequests() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let dtIni = moment(this.selectedDate.startDate).valueOf();
    let dtFin = moment(this.selectedDate.endDate).valueOf();

    let groups:any = await this.groupsGeneralService.listGroups().toPromise();

    groups.data.forEach(row => {
      this.groupsList.push(row.name);
    });

    this.selectedGroup = [this.groupsList[0]];

    let orders:any = await this.dashboardTelegramService.events(this.id, '?status=OPEN').toPromise();

    orders.data.forEach(row => {
      if (row.action == 'ORDERS') {
        this.dataSourceOperations.push(
          {
            "id": (row.content.exId) ? row.content.exId : '-- --',
            "opening": (row.content.timeIn) ? row.content.timeIn : '-- --',
            "closing": "-- --",
            "pair": (row.content.pair) ? row.content.pair : '-- --',
            "ranking": (row.content.type) ? row.content.type : '-- --',
            "group": (row.content.group) ? row.content.group : '-- --',
            "exchange": "-- --",
            "entry price": (row.content.buyMax) ? row.content.buyMax : '-- --',
            "amount": (row.content.initQty) ? row.content.initQty : '-- --',
            "total": (row.content.buyMax * row.content.initQty) + " BTC",
            "sl": "-- --",
            "t1/t2/t3": (row.content.targets) ? row.content.targets : '-- --',
            "status": (row.content.status) ? row.content.status : ' -- --',
            "result": "-- --",
            "duration": "-- --",
            "mep": "-- --",
            "men": "-- --"
          }
        );
      }
    });

    let counts:any = await this.dashboardTelegramService.counts(this.id, `?start=${dtIni}&end=${dtFin}`).toPromise();

    this.dataSourceInfo[0].total = counts.data.periodTrade;

    this.dataSourceInfo[1].total = counts.data.activeTrade;

    this.dataSourceInfo[2].total = counts.data.finishedTrades;

    this.dataSourceInfo[3].total = counts.data.gains;

    this.dataSourceInfo[4].total = counts.data.losses;

    let balances:any = await this.dashboardTelegramService.balances(this.id, `?start=${dtIni}&end=${dtFin}`).toPromise();

    this.dataPerformance = [];

    balances.data.forEach(row => {
      row.data.sort();

      this.dataPerformance.push({
        type: 'areaspline',
        name: row.name,
        data: row.data
      });
    });

    this.performanceChart.ref$.subscribe((chart) => {
      for (let i = 0; i < this.dataPerformance.length; i++) {
        chart.series[i].update(this.dataPerformance[i]);
      }

      chart.hideLoading();
    });

    this.loadingBarService.complete();
  }

  async listOrders(params) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let orders:any = await this.dashboardTelegramService.events(this.id, params).toPromise();

    this.dataSourceOperations = [];

    orders.data.forEach(row => {
      this.dataSourceOperations.push(
        {
          "id": (row.content.exId) ? row.content.exId : '-- --',
          "opening": (row.content.timeIn) ? row.content.timeIn : '-- --',
          "closing": "-- --",
          "pair": (row.content.pair) ? row.content.pair : '-- --',
          "ranking": (row.content.type) ? row.content.type : '-- --',
          "group": (row.content.group) ? row.content.group : '-- --',
          "exchange": "-- --",
          "entry price": (row.content.buyMax) ? row.content.buyMax : '-- --',
          "amount": (row.content.initQty) ? row.content.initQty : '-- --',
          "total": (row.content.buyMax * row.content.initQty) + ' BTC',
          "sl": "-- --",
          "t1/t2/t3": (row.content.targets) ? row.content.targets : '-- --',
          "status": (row.content.status) ? row.content.status : '-- --',
          "result": "-- --",
          "duration": "-- --",
          "mep": "-- --",
          "men": "-- --"
        }
      );
    });

    this.loadingBarService.complete();
  }

  deleteOperation(id) {
    Swal.fire({
      text: "Are you sure to delete this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        console.log(`Operations deleted! (${id})`);
      }
    });
  }

  selectedRobot(instanceId) {
    this.router.navigate([`/bot-telegram/dashboard/${instanceId}`]);
  }

  setSelectedDate(obj) {
    this.selectedDate = obj;

    this.initRequests();
  }

  setTab(tab) {
    tab = tab.replace(' ', '_').toUpperCase();

    this.listOrders(`?status=${tab}`);

    this.selectedTab = tab;
  }

}
