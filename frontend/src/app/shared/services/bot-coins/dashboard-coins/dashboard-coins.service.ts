import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardCoinsService {
  api = environment.apiRest + environment.projects.botCoins;

  header = new HttpHeaders({ 'Project': 'bot-coins' });

  constructor( private http: HttpClient ) { }

  executedStrategiesList(strategyid, params) {
    return this.http.get(`${this.api}/executed-strategies?${params}`, { headers: this.header });
  }

  getProfits(strategyid, params) {
    return this.http.get(`${this.api}/balance?${params}`, { headers: this.header });
  }

  currenciesList() {
    return this.http.get(`${this.api}/balance/currency`, { headers: this.header });
  }
}
