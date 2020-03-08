import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import {
  LoginService,
  ProfilesGeneralService,
  ProfilesService,
  UsersGeneralService
} from '../../services';

import * as firebase from 'firebase/app';

import Swal from 'sweetalert2';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private profilesGeneralService: ProfilesGeneralService,
    private profilesService: ProfilesService,
    private router: Router,
    private usersGeneralService: UsersGeneralService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn()) {
      this.refreshToken();

      let user = JSON.parse(localStorage.getItem('user'));

      if (user.profile) {
        this.verifyPermission(user);
      } else {
        this.usersGeneralService.getUser(user.uid).toPromise().then((res: any) => {
          let userCache = JSON.parse(localStorage.getItem('user'));

          userCache["profile"] = res.data().profile;

          localStorage.setItem('user', JSON.stringify(userCache));

          user = JSON.parse(localStorage.getItem('user'));

          this.verifyPermission(user);
        });
      }

      if (next.routeConfig.path != "front-page") {
        this.profilesService.profilesObservable.subscribe((res) => {
          if (Array.isArray(res['applications'])) {
            let path = _.find(res['applications'], { 'name': next.routeConfig.path });

            let index = _.findIndex(res['applications'], (o) => { return o.name === next.routeConfig.path });

            let sub = state.url.split('/').splice(1, 2)[1];

            let children = _.find(res['applications'][index].pages, { 'path': `/${sub}` });

            if (!path.name) {
              Swal.fire({
                text: 'You need permission from an administrator to access this route.',
                heightAuto: false
              }).then(() => {
                this.router.navigate(['/front-page']);
              });
            }

            if (sub) {
              if (!children.path) {
                Swal.fire({
                  text: 'You need permission from an administrator to access this route.',
                  heightAuto: false
                }).then(() => {
                  this.router.navigate(['/front-page']);
                });
              }
            }
          }
        });
      }

      return true;
    } else {
      localStorage.clear();

      this.router.navigate(['/login']);

      return false;
    }
  }

  refreshToken() {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        localStorage.setItem('token', idToken);
      });
    } else {
      setTimeout(() => {
        this.refreshToken();
      }, 5000);
    }
  }

  verifyPermission(user) {
    this.profilesGeneralService.getProfile(user.profile).subscribe((res: any) => {
      if (res.data().applications.length > 0) {
        this.profilesService.profilesChangeValue(res.data());
      } else {
        Swal.fire({
          text: 'You need permission from an administrator to access this system.',
          heightAuto: false
        }).then(() => {
          localStorage.clear();

          this.router.navigate(['/login']);
        });
      }
    });
  }

}
