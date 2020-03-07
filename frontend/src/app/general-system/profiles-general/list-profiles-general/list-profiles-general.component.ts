import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import {
  HeaderService,
  ProfilesGeneralService
} from 'src/app/shared';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-profiles-general',
  templateUrl: './list-profiles-general.component.html',
  styleUrls: ['./list-profiles-general.component.scss']
})
export class ListProfilesGeneralComponent implements OnInit {
  displayedColumns = ['name', 'editdelete'];

  dataSource = [];

  constructor(
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private profilesGeneralService: ProfilesGeneralService,
    private router: Router
    ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Profiles');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/profiles/add",
      text: "Add Profile"
    });

    this.listProfiles();
  }

  listProfiles() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.profilesGeneralService.listProfiles().toPromise().then((result) => {
      this.dataSource = [];

      result.docs.forEach((res) => {
        this.dataSource.push({
          id: res.id,
          name: res.id
        });

        this.dataSource.sort();
      });

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  editProfile(id: string) {
    this.router.navigate(['/general-system/profiles/view', id]);
  }

  deleteProfile(id: string) {
    Swal.fire({
      text: "Are you sure to delete this record?",
      showCancelButton: true,
      heightAuto: false
    }).then((choice) => {
      if(choice.value) {
        this.profilesGeneralService.deleteProfile(id).then(() => {
          this.listProfiles();
        });
      }
    });
  }

}
