import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesTelegramService
} from 'src/app/shared';

@Component({
  selector: 'app-view-strategies-telegram',
  templateUrl: './view-strategies-telegram.component.html',
  styleUrls: ['./view-strategies-telegram.component.scss']
})
export class ViewStrategiesTelegramComponent implements OnInit {
  id;

  formData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private strategiesTelegramService: StrategiesTelegramService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-telegram/strategies/list",
      text: "List Strategies"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesTelegramService.getStrategy(this.id).subscribe((response) => {
      this.formData = {
        name: response['data'].name,
        pairs: response['data'].config.pairs,
        size: response['data'].config.orderSize
      };

      this.loadingBarService.complete();
    });
  }

  editStrategy(rawForm) {
    let raw = {
      "name": rawForm.name,
      "config": {
        "orderSize": rawForm.size,
        "exchange": rawForm.exchange
      },
      "pairs": rawForm.pairs
    }

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.strategiesTelegramService.editStrategy(raw).subscribe(() => {
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
