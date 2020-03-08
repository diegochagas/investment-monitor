import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import {
  ProfilesService
} from 'src/app/shared';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  projects;

  constructor(
    private profilesService: ProfilesService
  ) { }

  ngOnInit() {
    this.profilesService.profilesObservable.subscribe((res: any) => {
      if (Array.isArray(res['applications'])) {
        this.projects = [];

        res['applications'].forEach(path => {
          this.projects.push(`/${path.name}`);
        });
      }
    });
  }

}
