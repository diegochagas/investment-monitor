import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardMarketService {
  api = environment.apiRest + environment.projects.marketMaker;

  header = new HttpHeaders({ 'Project': 'bot-market' });

  constructor( private http: HttpClient ) { }

  orderList(id, params) {
    return this.http.get(`${this.api}/order/${id}${params}`, { headers: this.header });
  }

  liquidateOrder(raw) {
    return this.http.post(`${this.api}/liquidate`, raw, { headers: this.header });
  }
}
