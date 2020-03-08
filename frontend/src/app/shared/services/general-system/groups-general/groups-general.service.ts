import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsGeneralService {
  api = environment.apiRest + environment.projects.generalSystem;

  header = new HttpHeaders({ 'Project': 'general-system' });

  constructor( private http: HttpClient ) { }

  listGroups() {
    return this.http.get(this.api+`/group`, { headers: this.header });
  }

  getGroup(id) {
    return this.http.get(this.api+`/group/${id}`, { headers: this.header });
  }

  addGroup(raw) {
    return this.http.post(this.api+`/group`, raw, { headers: this.header });
  }

  editGroup(id, raw) {
    return this.http.put(this.api+`/group/${id}`, raw, { headers: this.header });
  }

  deleteGroup(id) {
    return this.http.delete(this.api+`/group/${id}`, { headers: this.header });
  }

}
