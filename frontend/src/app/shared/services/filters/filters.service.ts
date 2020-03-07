import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  api = environment.apiRest;

  constructor( private http: HttpClient, private angularFirestore: AngularFirestore ) { }

  listProfiles() {
    return this.angularFirestore.collection('profile').get();
  }

  listCurrencies() {
    return this.angularFirestore.collection('currencies').doc('currencies').get();
  }

  listStrategies(project) {
    let header = new HttpHeaders({ 'Project': project });

    return this.http.get(`${this.api}/strategy/config`, { headers: header });
  }

  listHeaders(project) {
    let header = new HttpHeaders({ 'Project': project });

    return this.http.get(`${this.api}/strategy/header`, { headers: header });
  }

}
