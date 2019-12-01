import { Component, OnInit } from '@angular/core';

import {
  WhiteLabelService
} from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private whiteLabelService: WhiteLabelService
  ) {
    this.whiteLabelService.setTheme("backoffice");
  }

  ngOnInit() {
  }
}
