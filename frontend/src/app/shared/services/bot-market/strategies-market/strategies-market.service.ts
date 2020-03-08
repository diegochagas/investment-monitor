import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrategiesMarketService {
  api = environment.apiRest;

  header = new HttpHeaders({ 'Project': 'bot-market' });

  constructor( private http: HttpClient ) { }

  listStrategies(params?) {
    return this.http.get(this.api+`/strategy/config${params}`, { headers: this.header });
  }

  getStrategy(id) {
    return this.http.get(this.api+`/strategy/config/${id}`, { headers: this.header });
  }

  addStrategy(raw) {
    return this.http.post(this.api+`/strategy/config`, raw, { headers: this.header });
  }

  editStrategy(raw) {
    return this.http.post(this.api+`/strategy/config`, raw, { headers: this.header });
  }

  deleteStrategy(id, status) {
    return this.http.post(this.api+`/strategy/config/${id}/${status}`, '', { headers: this.header });
  }

}
