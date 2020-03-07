import { Component, OnInit } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { map } from 'rxjs/operators';

import {
  FiltersService,
  HeaderService,
  UsersGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-users-general',
  templateUrl: './users-general.component.html',
  styleUrls: ['./users-general.component.scss']
})
export class UsersGeneralComponent implements OnInit {
  displayedColumns = ['icon', 'name', 'email', 'profiles'];

  dataSource = [];

  dataProfiles = [];

  constructor(
    private filtersService: FiltersService,
    private headerService: HeaderService,
    private loadingBarService: LoadingBarService,
    private usersGeneralService: UsersGeneralService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Users');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/general-system/profiles/add",
      text: "Add Profile"
    });

    this.listUsers();

    this.listProfiles();
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

  listUsers() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.dataSource = [];

    this.usersGeneralService.listUsers().toPromise().then((result) => {
      result.docs.forEach((res) => {
        let result = res.data();

        this.dataSource.push({
          id: result.uid,
          icon: result.photoURL,
          name: result.displayName,
          email: result.email,
          profile: result.profile
        });
      });

      this.dataSource.sort();

      this.loadingBarService.complete();

      this.headerService.numberRecordsChangeValue(`${this.dataSource.length}`);
    });
  }

  profileTrigger(obj) {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.usersGeneralService.updateUser(obj.id).update({
      profile: obj.profile
    }).then(() => {
      this.loadingBarService.complete();
    });
  }

  listProfiles() {
    let profilesList = this.filtersService.listProfiles().pipe(map(result => {
      const profiles: any[] = [];

      result.forEach(res => {
        profiles.push(res.id)
      });

      return profiles;
    }));

    profilesList.subscribe((response: any[]) => {
      this.dataProfiles = response;
    });
  }

}
