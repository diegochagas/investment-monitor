import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersGeneralService {

  constructor( private angularFirestore: AngularFirestore ) { }

  listUsers() {
    return this.angularFirestore.collection('users').get();
  }

  getUser(id) {
    return this.angularFirestore.collection('users').doc(id).get();
  }

  addUser(id, raw) {
    return this.angularFirestore.collection('users').doc(id).set(raw);
  }

  deleteUser(id) {
    return this.angularFirestore.collection('users').doc(id).delete();
  }

  updateUser(id) {
    return this.angularFirestore.collection('users').doc(id);
  }

}
