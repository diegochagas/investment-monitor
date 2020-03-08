import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('email');

    provider.setCustomParameters({
      hd: 'atlasproj.com'
    });

    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  loginEmail(raw) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(raw.email, raw.password);
  }

  resetPassword(email) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user == null) {
      return false;
    } else {
      return true;
    }
  }

}
