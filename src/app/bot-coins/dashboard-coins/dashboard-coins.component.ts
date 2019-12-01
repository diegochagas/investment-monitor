import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { Router, ActivatedRoute } from '@angular/router';

import {
  DashboardCoinsService,
  HeaderService,
  RobotsCoinsService
} from 'src/app/shared';

@Component({
  selector: 'app-dashboard-coins',
  templateUrl: './dashboard-coins.component.html',
  styleUrls: ['./dashboard-coins.component.scss']
})
export class DashboardCoinsComponent implements OnInit, OnDestroy {
  id;

  robotsList = [];

  displayedColumns = ['symbol', 'status', 'quantity', 'expectedReturn', 'realizedReturn', 'date', 'view'];

  tabs = true;

  tabsArr = ['executed', 'partial executed', 'pendent', 'canceled'];

  dataSource = [];

  executedStrategies = [];

  currencies = [];

  profits = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardCoinsService: DashboardCoinsService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private robotsCoinsService: RobotsCoinsService,
    private router: Router
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Dashboard');

    this.headerService.numberRecordsChangeValue('');

    if (!this.id) {
      this.loadingBarService.stop();

      this.loadingBarService.start();

      this.headerService.buttonObjChangeValue({});

      this.robotsCoinsService.robotsList().subscribe((res: any) => {
        this.robotsList = res.data;

        this.loadingBarService.complete();
      });
    } else {
      this.headerService.buttonObjChangeValue({
        url: "/bot-coins/dashboard",
        text: "List Robots"
      });

      this.selectedData({
        startDate: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).getTime(),
        endDate: new Date().getTime(),
        mainCurrency: 'BTC' });
    }
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  selectedRobot(instanceId) {
    this.router.navigate([`/bot-coins/dashboard/${instanceId}`]);
  }

  async selectedData(data) {
    this.loadingBarService.start();

    let robotsResponse: any = await this.robotsCoinsService.robotsList().toPromise();

    let robot = robotsResponse.data.find(robot => robot.instanceId === this.id);

    if (robot) {
      let currenciesResponse: any = await this.dashboardCoinsService.currenciesList().toPromise();

      this.currencies = currenciesResponse.data;

      const paramsDates = `startDate=${data.startDate}&endDate=${data.endDate}`;

      let profitsResposne: any = await this.dashboardCoinsService.getProfits(robot.strategy._id, `${paramsDates}&mainCurrency=${data.mainCurrency}`).toPromise();

      this.profits = this.buildProfitsObject(profitsResposne.data);

      let executedStrategiesResponse: any = await this.dashboardCoinsService.executedStrategiesList(robot.strategy._id, paramsDates).toPromise();

      this.executedStrategies = this.buildExecutedStrategiesObjectList(executedStrategiesResponse.data);

      this.listExecutedStrategies('executed');

      this.loadingBarService.complete();
    }
  }

  buildProfitsObject(profits) {
    const invested = profits.initial.totalValue;
    const returns = invested - profits.final.totalValue;

    return { invested, returns, mainCurrency: profits.initial.mainCurrency, total: invested + returns, returnsPercentage: returns / invested * 100 };
  }

  buildExecutedStrategiesObjectList(executedStrategies) {
    return executedStrategies.map(data => {
      const expectedReturn = data.operation.opportunity.expectedReturn || 0;

      const realizedReturn = data.operation.opportunity.realizedReturn || 0;

      let { quantity, market, value, effectiveRate, fee } = data.operation.requests[0];

      const { id, symbol, snapshotTimeStamp } = market;

      const strategy = {
        symbol,
        status: data.operation.status,
        quantity: Math.abs(quantity),
        expectedReturn,
        realizedReturn,
        date: new Date(data.timeStamp)
      };

      const view = {
        ...strategy,
        value,
        market: id.replace('_', ' / '),
        type: quantity > 0 ? 'BUY' : (quantity < 0 ? 'SELL' : 'NONE'),
        orderId: data.operation.executed[0].id,
        effectiveRate,
        fee: fee + (data.operation.requests[1].fee || 0),
        orderDate: new Date(snapshotTimeStamp)
      };

      return { ...strategy, view };
    });
  }

  listExecutedStrategies(params) {
    this.dataSource = this.executedStrategies.filter(strategy => strategy.status === params);
  }

  setTab(tab) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.listExecutedStrategies(tab);

    this.loadingBarService.complete();
  }
}
