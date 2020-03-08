import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribersGeneralService {

  api = environment.apiRest + environment.projects.generalSystem;

  header = new HttpHeaders({ 'Project': 'general-system' });

  constructor( private http: HttpClient ) { }

  addSubscriber(raw) {
    return this.http.post(`${this.api}/topic`, raw, { headers: this.header });
  }

  getSubscriber(id) {
    return this.http.get(`${this.api}/topic/${id}`, { headers: this.header });
  }

  listSubscribers() {
    return this.http.get(`${this.api}/topic`, { headers: this.header });
  }

  editSubscriber(id, raw) {
    return this.http.put(`${this.api}/topic/${id}`, raw, { headers: this.header });
  }

  deleteSubscriber(id) {
    return this.http.delete(`${this.api}/topic/${id}`, { headers: this.header });
  }

}
