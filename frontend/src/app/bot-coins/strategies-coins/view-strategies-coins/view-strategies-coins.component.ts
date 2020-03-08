import { Component, OnInit } from '@angular/core';

import {
  HeaderService
} from 'src/app/shared';

@Component({
  selector: 'app-view-strategies-coins',
  templateUrl: './view-strategies-coins.component.html',
  styleUrls: ['./view-strategies-coins.component.scss']
})
export class ViewStrategiesCoinsComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('View Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-garch/strategies/list",
      text: "List Strategies"
    });
  }

}
