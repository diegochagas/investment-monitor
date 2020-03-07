import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  SubscribersGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-view-subscribers-general',
  templateUrl: './view-subscribers-general.component.html',
  styleUrls: ['./view-subscribers-general.component.scss']
})
export class ViewSubscribersGeneralComponent implements OnInit {
  id;

  formData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private subscribersGeneralService: SubscribersGeneralService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Subscriber');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/subscribers/list",
      text: "List Subscribers"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.subscribersGeneralService.getSubscriber(this.id).subscribe((response) => {
      this.formData = {
        name: response['data'].name,
        type: response['data'].type,
        group: response['data'].group
      };

      this.loadingBarService.complete();
    });
  }

  editSubscriber(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.subscribersGeneralService.editSubscriber(this.id, raw).subscribe(() => {
      Swal.fire({
        text: 'Subscriber edited.',
        heightAuto: false
      });

      this.loadingBarService.complete();
    }, err => {
      Swal.fire({
        text: `Error: ${err.statusText}`,
        heightAuto: false
      });

      this.loadingBarService.complete();
    });
  }

}
