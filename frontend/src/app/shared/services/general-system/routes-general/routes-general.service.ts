import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesGeneralService {
  api = environment.apiRest + environment.projects.generalSystem;

  header = new HttpHeaders({ 'Project': 'general-system' });

  constructor( private http: HttpClient ) { }

  listRoutes() {
    return this.http.get(this.api+`/route`, { headers: this.header });
  }

  getRoute(id) {
    return this.http.get(this.api+`/route/${id}`, { headers: this.header });
  }

  addRoute(raw) {
    return this.http.post(this.api+`/route`, raw, { headers: this.header });
  }

  editRoute(id, raw) {
    return this.http.put(this.api+`/route/${id}`, raw, { headers: this.header });
  }

  deleteRoute(id) {
    return this.http.delete(this.api+`/route/${id}`, { headers: this.header });
  }

}
