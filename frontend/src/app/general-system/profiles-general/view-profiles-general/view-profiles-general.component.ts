import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import Swal from 'sweetalert2';

import {
  HeaderService,
  ProfilesGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-view-profiles-general',
  templateUrl: './view-profiles-general.component.html',
  styleUrls: ['./view-profiles-general.component.scss']
})
export class ViewProfilesGeneralComponent implements OnInit {
  id;

  formData = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private profilesGeneralService: ProfilesGeneralService
  ) {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Profile');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/profiles/list",
      text: "List Profiles"
    });

    this.listProfiles();
  }

  listProfiles() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.profilesGeneralService.getProfile(this.id).toPromise().then((response) => {
      this.formData = {
        id: response.id,
        applications: response.data().applications
      };

      //this.loadingBarService.complete(); -- está finalizando no <app-form>
    });
  }

  editProfile(raw) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.profilesGeneralService.updateProfile(raw.id, { applications: raw.applications }).then(() => {
      Swal.fire({
        text: 'Profile edited.',
        heightAuto: false
      });

      this.loadingBarService.complete();
    }, () => {
      this.loadingBarService.complete();
    });
  }

}
