import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardGarchService {
  api = environment.apiRest + environment.projects.botGarch;

  header = new HttpHeaders({ 'Project': 'bot-garch' });

  constructor( private http: HttpClient ) { }

  getOrder(id, params) {
    return this.http.get(`${this.api}/order/${id}${params}`, { headers: this.header });
  }

  getBand(params) {
    return this.http.get(`${this.api}/band/${params}`, { headers: this.header });
  }

  getCandles(params) {
    return this.http.get(`${this.api}/candle/latest${params}`, { headers: this.header });
  }
}
