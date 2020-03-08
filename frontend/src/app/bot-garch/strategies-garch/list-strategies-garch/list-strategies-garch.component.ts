import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  ExchangeGeneralService,
  HeaderService,
  StrategiesGarchService
} from 'src/app/shared';

@Component({
  selector: 'app-list-strategies-garch',
  templateUrl: './list-strategies-garch.component.html',
  styleUrls: ['./list-strategies-garch.component.scss']
})
export class ListStrategiesGarchComponent implements OnInit {
  displayedColumns = ['date', 'name', 'exchange', 'version', 'status', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/bot-garch/strategies/add";

  buttonStatus = false;

  tabs = true;

  tabsArr = ['active', 'inactive'];

  selectedTab = "active";

  constructor(
    private exchangeGeneralService: ExchangeGeneralService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private router: Router,
    private strategiesGarchService: StrategiesGarchService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Strategies');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-garch/strategies/add",
      text: "Add Strategy"
    });

    this.listStrategies('');
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  listStrategies(params) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesGarchService.listStrategies(params).subscribe((response: any[]) => {
      this.dataSource = [];

      this.dataSource = response['data'].map((data) => ({
        id: data._id,
        name: data.name,
        exchangeId: data.config.exchange,
        version: "Version "+data.version,
        status: data.status,
        date: data.updatedAt
      }));

      this.exchangeGeneralService.listExchanges().subscribe((response: any) => {
        this.dataSource = this.dataSource.map(strategy => {
          const exchange = response.data.find(data => data._id === strategy.exchangeId);
          strategy['exchange'] = exchange ? exchange.name : '';
          return strategy;
        });
      });

      this.buttonStatus = true;

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editTrigger(id) {
    this.router.navigate(['/bot-garch/strategies/view', id]);
  }

  deleteTrigger(id) {
    Swal.fire({
      text: "Are you sure to change status of this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        let status = (this.selectedTab == "active") ? "inactive" : "active";

        this.strategiesGarchService.deleteStrategy(id, status).subscribe(() => {
          this.listStrategies(`?status=${this.selectedTab}`);
        });
      }
    });
  }

  setTab(tab) {
    this.listStrategies(`?status=${tab}`);

    this.selectedTab = tab;
  }

}
