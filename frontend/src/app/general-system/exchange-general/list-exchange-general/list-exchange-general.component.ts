import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  ExchangeGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-list-exchange-general',
  templateUrl: './list-exchange-general.component.html',
  styleUrls: ['./list-exchange-general.component.scss']
})
export class ListExchangeGeneralComponent implements OnInit {
  displayedColumns = ['icon', 'name', 'url', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/general-system/exchange/add";

  buttonStatus = false;

  constructor(
    private loadingBarService: LoadingBarService,
    private exchangeGeneralService: ExchangeGeneralService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Exchanges');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/exchange/add",
      text: "Add Exchange"
    });

    this.listExchanges();
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  listExchanges() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.exchangeGeneralService.listExchanges().subscribe((response: any[]) => {
      this.dataSource = response['data'].map((data) => ({
        id: data._id,
        icon: data.iconFile,
        name: data.name,
        url: data.url
      }));

      this.buttonStatus = true;

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editTrigger(id) {
    this.router.navigate(['/general-system/exchange/view', id]);
  }

  deleteTrigger(id) {
    Swal.fire({
      text: "Are you sure to delete this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        this.loadingBarService.stop();

        this.loadingBarService.start();

        this.exchangeGeneralService.deleteExchange(id).subscribe(() => {
          this.listExchanges();
        });
      }
    });
  }

}
