import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';

import * as _ from 'lodash';

import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import {
  CryptDecryptService,
  LoginService,
  UsersGeneralService,
  WhiteLabelService
} from '../shared';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin', { static: true }) formLogin;

  formGroupLogin: FormGroup;

  date = new Date();
  year;

  passVisible = false;

  textPassword = "PASSWORD";

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private cryptDecryptService: CryptDecryptService,
    private formBuilder: FormBuilder,
    private loadingBarService: LoadingBarService,
    private loginService: LoginService,
    private router: Router,
    private title: Title,
    private usersGeneralService: UsersGeneralService,
    private whiteLabelService: WhiteLabelService
  ) {
    this.whiteLabelService.setTheme("backoffice");

    this.formGroupLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.title.setTitle('Atlas Quantum - Backoffice');
  }

  ngOnInit() {
    this.year = this.date.getFullYear();
  }

  passToggle() {
    this.passVisible = !this.passVisible;
  }

  focusToggle(event) {
    if (event.target.parentElement.classList.contains('focus')) {
      event.target.parentElement.classList.remove('focus');
    } else {
      event.target.parentElement.classList.add('focus');
    }

    this.validatorForm(event);
  }

  validatorForm(event) {
    let message = "";

    if (this.formGroupLogin.controls[event.target.getAttribute('formControlName')].errors) {
      switch (true) {
        case (this.formGroupLogin.controls[event.target.getAttribute('formControlName')].errors.required) ? true : false:
          message = `This field is required`;
        break;

        case (this.formGroupLogin.controls[event.target.getAttribute('formControlName')].errors.email) ? true : false:
          message = `This email is not valid`;
        break;

        case this.formGroupLogin.controls.password.errors.minlength.requiredLength > this.formGroupLogin.controls.password.errors.minlength.actualLength:
          message = `This field is at least ${this.formGroupLogin.controls.password.errors.minlength.requiredLength} characters`;
        break;
      }
    } else {
      message = "";
    }

    if (message) {
      if (!event.target.parentElement.classList.contains('error')) {
        event.target.parentElement.classList.add('error');
      }

      for (let i = 0; i < event.target.offsetParent.children.length; i++) {
        if (event.target.offsetParent.children[i].className == "error") {
          event.target.offsetParent.children[i].innerText = message;
        }
      }
    } else {
      event.target.parentElement.classList.remove('error');

      for (let i = 0; i < event.target.offsetParent.children.length; i++) {
        if (event.target.offsetParent.children[i].className == "error") {
          event.target.offsetParent.children[i].innerText = message;
        }
      }
    }
  }

  async userLoginEmail() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let email = this.cryptDecryptService.encrypt(this.formGroupLogin.value.email);

    let password = this.cryptDecryptService.encrypt(this.formGroupLogin.value.password);

    let listUsers = await this.angularFirestore.collection("users").get().toPromise();

    listUsers.docs.map(row => {
      let user = row.data();

      email = this.cryptDecryptService.decrypt(user.email);

      if (email === this.formGroupLogin.value.email) {
        if (user.password) {
          password = this.cryptDecryptService.decrypt(user.password);

          if (password === this.formGroupLogin.value.password) {
            password = user.password;

            email = user.email;
          }
        } else {
          email = user.email;
        }

        this.executeLogin(this.formGroupLogin.value.email, email, password);
      }
    });
  }

  async userLoginGoogle() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    let response = await this.loginService.loginGoogle();

    if (response.additionalUserInfo.isNewUser) {
      let userInfo = {
        displayName: response.additionalUserInfo.profile['name'],
        email: this.cryptDecryptService.encrypt(response.additionalUserInfo.profile['email']),
        photoURL: response.additionalUserInfo.profile['picture'],
        profile: "guest",
        uid: response.user.uid
      }

      let userCache = response.user.toJSON();

      this.angularFirestore.collection("users").doc(userCache['uid']).set(userInfo);

      userCache["profile"] = userInfo.profile;

      localStorage.setItem('user', JSON.stringify(userCache));

      response.user.getIdToken(true).then((res) => {
        localStorage.setItem('token', res);

        this.formLogin.nativeElement.classList.add('close');

        this.loadingBarService.complete();

        setTimeout(() => {
          this.textPassword = "CREATE YOUR NEW PASSWORD";

          this.formGroupLogin.patchValue({
            email: response.user.email
          });

          Swal.fire({
            text: "Create your new password, if you want, or click the Google button again.",
            heightAuto: false
          });

          this.formLogin.nativeElement.classList.add('open');
        }, 600);
      });
    } else {
      response.user.getIdToken(true).then((res) => {
        localStorage.setItem('token', res);

        let userCache = response.user.toJSON();

        this.usersGeneralService.getUser(userCache['uid']).toPromise().then((res: any) => {
          userCache["profile"] = res.data().profile;

          localStorage.setItem('user', JSON.stringify(userCache));

          this.afterLogin();
        });
      });
    }
  }

  executeLogin(email, encryptedEmail, password) {
    this.loginService.loginEmail({ email, password }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user));

      res.user.getIdToken(true).then((res) => {
        localStorage.setItem('token', res);

        this.afterLogin();
      });
    }, async (error) => {
      this.loadingBarService.complete();

      if (error.code == "auth/wrong-password") {
        if (this.angularFireAuth.auth.currentUser) {
          this.loadingBarService.stop();

          this.loadingBarService.start();

          let userInfoCache = await this.angularFirestore.collection("users").doc(this.angularFireAuth.auth.currentUser.uid).get().toPromise();

          let userInfo = JSON.parse(JSON.stringify(userInfoCache.data()));

          userInfo['email'] = encryptedEmail;

          userInfo['password'] = password;

          this.angularFirestore.collection("users").doc(this.angularFireAuth.auth.currentUser.uid).set(userInfo);

          const credential = firebase.auth.EmailAuthProvider.credential(this.formGroupLogin.value.email, password);

          this.angularFireAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credential).then(() => {
            this.loadingBarService.complete();

            Swal.fire({
              text: "Login created with success. Click the Login button again.",
              heightAuto: false
            });

            this.afterLogin();
          }, (error) => {
            this.loadingBarService.complete();

            if (error.code == "auth/provider-already-linked") {
              Swal.fire({
                text: "Wrong password, please refile correctly.",
                heightAuto: false
              });
            }
          });
        } else {
          Swal.fire({
            text: "Your password is incorrect.",
            heightAuto: false
          });
        }
      }

      if (error.code == "auth/user-not-found") {
        Swal.fire({
          text: "Non-existent user, sign in with Google.",
          heightAuto: false
        });
      }
    });
  }

  afterLogin() {
    this.loadingBarService.complete();

    this.router.navigate(['/front-page']);
  }

  resetPassword() {
    let email = this.formGroupLogin.value.email;

    if (email) {
      this.loginService.resetPassword(email).then(() => {
        Swal.fire({
          text: "We sent you an email.",
          heightAuto: false
        }).then(() => {
          this.formGroupLogin.reset();
        });
      }, (error) => {
        if (error.code == "auth/user-not-found") {
          Swal.fire({
            text: error.message,
            heightAuto: false
          });
        }
      });
    } else {
      Swal.fire({
        text: "You need to fill in your email before.",
        heightAuto: false
      });
    }
  }

}
