import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  ProfilesGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-add-profiles-general',
  templateUrl: './add-profiles-general.component.html',
  styleUrls: ['./add-profiles-general.component.scss']
})
export class AddProfilesGeneralComponent implements OnInit {
  @ViewChild('profileForm', { static: true }) profileForm;

  formData = {};

  constructor(
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private profilesGeneralService: ProfilesGeneralService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Profile');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/profiles/list",
      text: "List Profiles"
    });

    this.loadingBarService.stop();

    this.loadingBarService.start();

    setTimeout(() => {
      this.formData = {
        id: "",
        applications: []
      };
    }, 100);
  }

  addProfile(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.profilesGeneralService.addProfile(raw.id, { applications: raw.applications }).then(() => {
      Swal.fire({
        text: 'Profile added.',
        heightAuto: false
      });

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
