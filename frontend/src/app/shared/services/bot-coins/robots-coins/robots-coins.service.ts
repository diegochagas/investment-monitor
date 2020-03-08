import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RobotsCoinsService {
  api = environment.apiRest + environment.projects.generalSystem;

  header = new HttpHeaders({ 'Project': 'bot-coins' });

  constructor( private http: HttpClient ) { }

  robotsList() {
    return this.http.get(`${this.api}/instance`, { headers: this.header });
  }

  toggleState(id, raw) {
    return this.http.put(`${this.api}/instance/${id}/action`, raw, { headers: this.header });
  }

  updateStrategy(id, raw) {
    return this.http.put(`${this.api}/instance/${id}`, raw, { headers: this.header });
  }
}
