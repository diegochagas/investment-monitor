import { Component, OnInit, Input } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import {
  ProfilesService
} from '../../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() type;

  projects = ['/bot-coins', '/bot-garch', '/bot-market', '/bot-telegram', '/general-system'];

  profiles = [];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private profilesService: ProfilesService
  ) { }

  ngOnInit() {
    this.profilesService.profilesObservable.subscribe((res) => {
      this.profiles = res;
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();

    localStorage.clear();

    this.router.navigate(['/login']);
  }

}
