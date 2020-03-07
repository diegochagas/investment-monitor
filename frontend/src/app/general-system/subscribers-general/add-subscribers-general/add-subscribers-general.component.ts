import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  SubscribersGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-add-subscribers-general',
  templateUrl: './add-subscribers-general.component.html',
  styleUrls: ['./add-subscribers-general.component.scss']
})
export class AddSubscribersGeneralComponent implements OnInit {
  @ViewChild('subscriberForm', { static: true }) subscriberForm;

  constructor(
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private subscribersGeneralService: SubscribersGeneralService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Subscriber');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/subscribers/list",
      text: "List Subscribers"
    });
  }

  addSubscriber(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.subscribersGeneralService.addSubscriber(raw).subscribe(() => {
      Swal.fire({
        text: 'Subscriber registered.',
        heightAuto: false
      });

      this.subscriberForm.resetForm();

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
