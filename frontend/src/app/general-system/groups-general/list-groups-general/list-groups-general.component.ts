import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  GroupsGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-list-groups-general',
  templateUrl: './list-groups-general.component.html',
  styleUrls: ['./list-groups-general.component.scss']
})
export class ListGroupsGeneralComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'created', 'updated', 'editdelete'];

  dataSource = [];

  urlButtonAdd = "/general-system/exchange/add";

  buttonStatus = false;

  constructor(
    private groupsGeneralService: GroupsGeneralService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Groups');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/groups/add",
      text: "Add Group"
    });

    this.listGroups();
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  listGroups() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.groupsGeneralService.listGroups().subscribe((response: any[]) => {
      this.dataSource = response['data'].map((data) => ({
        'id': data._id,
        'name': data.name,
        'created': data.createdAt,
        'updated': data.updatedAt
      }));

      this.buttonStatus = true;

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editTrigger(id) {
    this.router.navigate(['/general-system/groups/view', id]);
  }

  deleteTrigger(id) {
    Swal.fire({
      text: "Are you sure to delete this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        this.groupsGeneralService.deleteGroup(id).subscribe(() => {
          this.listGroups();
        });
      }
    });
  }

}
