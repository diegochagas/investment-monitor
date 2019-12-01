import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhiteLabelService {
  private themeWrapper = document.querySelector('body');

  constructor( private http: HttpClient ) { }

  setTheme(theme) {
    return this.http.get('/assets/white-label.json').subscribe((response: any) => {
      for(let key in response[theme]) {
        this.themeWrapper.style.setProperty(`--${key}`, response[theme][key]);
      }
    });
  }
}
