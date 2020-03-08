import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  ExchangeGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-add-exchange-general',
  templateUrl: './add-exchange-general.component.html',
  styleUrls: ['./add-exchange-general.component.scss']
})
export class AddExchangeGeneralComponent implements OnInit {
  @ViewChild('exchangeForm', { static: true }) exchangeForm;

  constructor(
    private loadingBarService: LoadingBarService,
    private exchangeGeneralService: ExchangeGeneralService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Exchange');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/exchange/list",
      text: "List Exchanges"
    });
  }

  addExchange(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.exchangeGeneralService.addExchange(raw).subscribe(() => {
      Swal.fire({
        text: 'Exchange registered.',
        heightAuto: false
      });

      this.exchangeForm.resetForm();

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
