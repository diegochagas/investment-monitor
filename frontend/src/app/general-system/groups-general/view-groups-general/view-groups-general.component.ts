import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  GroupsGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-view-groups-general',
  templateUrl: './view-groups-general.component.html',
  styleUrls: ['./view-groups-general.component.scss']
})
export class ViewGroupsGeneralComponent implements OnInit {
  id;

  formData;

  constructor(
    private loadingBarService: LoadingBarService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private groupsGeneralService: GroupsGeneralService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Group');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/groups/list",
      text: "List Groups"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.groupsGeneralService.getGroup(this.id).subscribe((response) => {
      this.formData = {
        name: response['data'].name,
        groupId: response['data'].groupId
      };

      this.loadingBarService.complete();
    });
  }

  editGroup(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.groupsGeneralService.editGroup(this.id, raw).subscribe(() => {
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
