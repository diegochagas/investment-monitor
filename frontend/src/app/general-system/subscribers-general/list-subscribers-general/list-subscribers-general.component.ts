import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import {
  HeaderService,
  SubscribersGeneralService
} from 'src/app/shared';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-subscribers-general',
  templateUrl: './list-subscribers-general.component.html',
  styleUrls: ['./list-subscribers-general.component.scss']
})
export class ListSubscribersGeneralComponent implements OnInit {
  displayedColumns = ['name', 'type', 'group', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/general-system/subscribers/add";

  constructor(
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private router: Router,
    private subscribersGeneralService: SubscribersGeneralService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Subscribers');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: this.urlButtonAdd,
      text: "Add Subscriber"
    });

    this.listSubscribers();
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  listSubscribers() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.subscribersGeneralService.listSubscribers().subscribe((response: any) => {
      this.dataSource = response['data'].map(data => ({
        id: data._id,
        name: data.name,
        type: data.type,
        group: data.group
      }));

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editSubscriber(id: string) {
    this.router.navigate(['/general-system/subscribers/view', id]);
  }

  deleteSubscriber(id: string) {
    Swal.fire({
      text: "Are you sure to delete this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        this.loadingBarService.stop();

        this.loadingBarService.start();

        this.subscribersGeneralService.deleteSubscriber(id).subscribe(() => {
          this.listSubscribers();
        });
      }
    });
  }

}
