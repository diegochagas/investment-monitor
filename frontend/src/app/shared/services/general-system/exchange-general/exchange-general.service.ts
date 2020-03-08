import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeGeneralService {
  api = environment.apiRest + environment.projects.generalSystem;

  header = new HttpHeaders({ 'Project': 'general-system' });

  constructor( private http: HttpClient ) { }

  listExchanges() {
    return this.http.get(this.api+`/exchange`, { headers: this.header });
  }

  getExchange(id) {
    return this.http.get(this.api+`/exchange/${id}`, { headers: this.header });
  }

  addExchange(raw) {
    return this.http.post(this.api+`/exchange`, raw, { headers: this.header });
  }

  editExchange(id, raw) {
    return this.http.put(this.api+`/exchange/${id}`, raw, { headers: this.header });
  }

  deleteExchange(id) {
    return this.http.delete(this.api+`/exchange/${id}`, { headers: this.header });
  }

}
