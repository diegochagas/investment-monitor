import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { LoadingBarService } from '@ngx-loading-bar/core';

import {
  HeaderService,
  RobotsMarketService,
  SocketService
} from 'src/app/shared';

import * as _ from 'lodash';

@Component({
  selector: 'app-robots-market',
  templateUrl: './robots-market.component.html',
  styleUrls: ['./robots-market.component.scss']
})
export class RobotsMarketComponent implements OnInit {
  displayedColumns = ['instance', 'strategy', 'updated', 'status', 'change', 'state'];

  dataSource = [];

  constructor(
    private loadingBarService: LoadingBarService,
    private robotsMarketService: RobotsMarketService,
    private headerService: HeaderService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Robots');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({});

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.robotsMarketService.robotsList().subscribe((response: any) => {
      this.dataSource = response['data'].map((data) => ({
        id: data._id,
        instance: data.instanceId,
        strategy: (data.strategy) ? data.strategy.presentationName : "No strategy",
        updated: data.updatedAt,
        status: data.status,
        reason: (data.reason) ? data.reason : "",
        label: data.label,
        running: 0
      }));

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });

    this.socketService.roomTextChangeValue('bot-market');

    this.socketService.connect();

    this.socketService.onMessage().subscribe((response: any) => {
      if (this.dataSource.length > 0) {
        let index = _.findIndex(this.dataSource, { 'id': response._id });

        this.dataSource[index].updated = response.updatedAt;

        this.dataSource[index].status = response.status;

        this.dataSource[index].strategy = (response.strategy) ? response.strategy.presentationName : "No strategy";

        this.dataSource[index].reason = response.reason;

        if (response.status == 'STALLED' && localStorage.getItem('stalled') === 'false') {
          Swal.fire({
            text: response.reason,
            heightAuto: false
          });

          localStorage.setItem('stalled', 'true');
        } else if (response.status != 'STALLED') {
          localStorage.setItem('stalled', 'false');
        }
      }
    });
  }

  ngOnDestroy() {
    this.loadingBarService.stop();

    this.socketService.disconnect();
  }

  stateTrigger(obj) {
    let index = _.findIndex(this.dataSource, { 'id': obj.id });

    let raw = { action: obj.state }

    this.dataSource[index].running = 1;

    this.robotsMarketService.toggleState(obj.id, raw).subscribe(() => {
      this.dataSource[index].running = 0;
    }, err => {
      if (err.error) {
        if (err.error.message) {
          this.dataSource[index].running = 0;

          Swal.fire({
            text: err.error.message,
            heightAuto: false
          });
        }
      }
    });
  }

}
