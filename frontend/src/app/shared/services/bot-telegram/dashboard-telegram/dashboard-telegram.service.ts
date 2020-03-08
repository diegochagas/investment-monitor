import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardTelegramService {
  api = environment.apiRest + environment.projects.botTelegram;

  header = new HttpHeaders({ 'Project': 'bot-telegram' });

  constructor( private http: HttpClient ) { }

  events(id, params) {
    return this.http.get(`${this.api}/events/${id}${params}`, { headers: this.header });
  }

  counts(id, params) {
    return this.http.get(`${this.api}/metrics/sum/${id}${params}`, { headers: this.header });
  }

  balances(id, params) {
    return this.http.get(`${this.api}/metrics/channel-balances/${id}${params}`, { headers: this.header });
  }
}
