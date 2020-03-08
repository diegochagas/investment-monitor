import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfilesGeneralService {

  constructor( private angularFirestore: AngularFirestore ) { }

  listProfiles() {
    return this.angularFirestore.collection('profile').get();
  }

  getProfile(id) {
    return this.angularFirestore.collection('profile').doc(id).get();
  }

  addProfile(id, raw) {
    return this.angularFirestore.collection('profile').doc(id).set(raw);
  }

  deleteProfile(id) {
    return this.angularFirestore.collection('profile').doc(id).delete();
  }

  updateProfile(id, raw) {
    return this.angularFirestore.collection('profile').doc(id).set(raw, { merge: true });
  }

}
