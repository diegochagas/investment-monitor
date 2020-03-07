import { Component, OnInit, Input } from '@angular/core';

import { Router } from  '@angular/router';

import {
  ProfilesService
} from '../../services';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() dataCards = [];

  profiles;

  constructor(
    private router: Router,
    private profilesService: ProfilesService
  ) { }

  ngOnInit() {
    this.profilesService.profilesObservable.subscribe((res) => {
      if (Array.isArray(res['applications'])) {
        this.profiles = res['applications'];
      }
    });
  }

  redirect(project, endpoint, type) {
    this.router.navigate([project, endpoint, type]);
  }

}
