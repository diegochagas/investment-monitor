import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  ExchangeGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-view-exchange-general',
  templateUrl: './view-exchange-general.component.html',
  styleUrls: ['./view-exchange-general.component.scss']
})
export class ViewExchangeGeneralComponent implements OnInit {
  id;

  formData;

  constructor(
    private loadingBarService: LoadingBarService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private exchangeGeneralService: ExchangeGeneralService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Exchange');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/exchange/list",
      text: "List Exchanges"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.exchangeGeneralService.getExchange(this.id).subscribe((response) => {
      this.formData = {
        name: response['data'].name,
        url: response['data'].url,
        iconFile: response['data'].iconFile,
        maxConcurrentRequests: response['data'].maxConcurrentRequests,
        minTimeBetweenRequests: response['data'].minTimeBetweenRequests
      };

      this.loadingBarService.complete();
    });
  }

  editExchange(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.exchangeGeneralService.editExchange(this.id, raw).subscribe(() => {
      Swal.fire({
        text: 'Exchange edited.',
        heightAuto: false
      });

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
