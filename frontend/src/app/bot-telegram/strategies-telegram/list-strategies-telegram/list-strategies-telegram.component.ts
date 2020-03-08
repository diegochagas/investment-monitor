import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesTelegramService
} from 'src/app/shared';

@Component({
  selector: 'app-list-strategies-telegram',
  templateUrl: './list-strategies-telegram.component.html',
  styleUrls: ['./list-strategies-telegram.component.scss']
})
export class ListStrategiesTelegramComponent implements OnInit {
  displayedColumns = ['date', 'name', 'version', 'status', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/bot-telegram/strategies/add";

  buttonStatus = false;

  tabs = true;

  tabsArr = ['active', 'inactive'];

  selectedTab = "active";

  constructor(
    private loadingBarService: LoadingBarService,
    private strategiesTelegramService: StrategiesTelegramService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Strategies');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-telegram/strategies/add",
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

    this.strategiesTelegramService.listStrategies(params).subscribe((response: any[]) => {
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
    this.router.navigate(['/bot-telegram/strategies/view', id]);
  }

  deleteTrigger(id) {
    Swal.fire({
      text: "Are you sure to change status of this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        let status = (this.selectedTab == "active") ? "inactive" : "active";

        this.strategiesTelegramService.deleteStrategy(id, status).subscribe(() => {
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
