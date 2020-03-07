import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  GroupsGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-add-groups-general',
  templateUrl: './add-groups-general.component.html',
  styleUrls: ['./add-groups-general.component.scss']
})
export class AddGroupsGeneralComponent implements OnInit {
  @ViewChild('groupsForm', { static: true }) groupsForm;

  constructor(
    private loadingBarService: LoadingBarService,
    private groupsGeneralService: GroupsGeneralService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Group');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/groups/list",
      text: "List Groups"
    });
  }

  addGroup(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.groupsGeneralService.addGroup(raw).subscribe(() => {
      Swal.fire({
        text: 'Group registered.',
        heightAuto: false
      });

      this.groupsForm.resetForm();

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
