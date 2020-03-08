import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  StrategiesTelegramService
} from 'src/app/shared';

@Component({
  selector: 'app-add-strategies-telegram',
  templateUrl: './add-strategies-telegram.component.html',
  styleUrls: ['./add-strategies-telegram.component.scss']
})
export class AddStrategiesTelegramComponent implements OnInit {
  @ViewChild('strategyForm', { static: true }) strategyForm;

  constructor(
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private strategiesTelegramService: StrategiesTelegramService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-telegram/strategies/list",
      text: "List Strategies"
    });
  }

  addStrategy(rawForm) {
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

    this.strategiesTelegramService.addStrategy(raw).subscribe(() => {
      Swal.fire({
        text: 'Strategy registered.',
        heightAuto: false
      });

      this.strategyForm.resetForm();

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
