import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesMarketService
} from 'src/app/shared';

@Component({
  selector: 'app-list-strategies-market',
  templateUrl: './list-strategies-market.component.html',
  styleUrls: ['./list-strategies-market.component.scss']
})
export class ListStrategiesMarketComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'version', 'status', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/bot-market/strategies/add";

  buttonStatus = false;

  tabs = true;

  tabsArr = ['active', 'inactive'];

  selectedTab = "active";

  constructor(
    private loadingBarService: LoadingBarService,
    private strategiesMarketService: StrategiesMarketService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Strategies');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-market/strategies/add",
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

    this.strategiesMarketService.listStrategies(params).subscribe((response: any[]) => {
      this.dataSource = [];

      this.dataSource = response['data'].map((data) => ({
        id: data._id,
        name: data.name,
        version: "Version "+data.version,
        status: data.status,
        date: data.updatedAt
      }));

      this.buttonStatus = true;

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editTrigger(id) {
    this.router.navigate(['/bot-market/strategies/view', id]);
  }

  deleteTrigger(id) {
    Swal.fire({
      text: "Are you sure to change status of this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        let status = (this.selectedTab == "active") ? "inactive" : "active";

        this.strategiesMarketService.deleteStrategy(id, status).subscribe(() => {
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
