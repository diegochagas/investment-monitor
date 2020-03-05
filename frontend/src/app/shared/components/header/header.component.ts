import { Component, OnInit } from '@angular/core';

import {
  HeaderService,
  WhiteLabelService
} from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedTheme;

  headerText;
  numberRecords;
  buttonObj;

  constructor(
    private whiteLabelService: WhiteLabelService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.selectedTheme = ("theme" in localStorage) ? localStorage.getItem('theme') : 'whiteBlue';

    this.headerService.headerText.subscribe((text) => {
      this.headerText = text;
    });

    this.headerService.numberRecords.subscribe((text) => {
      this.numberRecords = text;
    });

    this.headerService.buttonObj.subscribe((obj) => {
      this.buttonObj = obj;
    });
  }

  changeTheme(theme) {
    this.whiteLabelService.setTheme(theme);

    localStorage.setItem('theme', theme);

    this.selectedTheme = theme;
  }

}
