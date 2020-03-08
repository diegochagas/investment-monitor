import { Component, OnInit } from '@angular/core';

import {
  HeaderService
} from 'src/app/shared';

@Component({
  selector: 'app-add-strategies-coins',
  templateUrl: './add-strategies-coins.component.html',
  styleUrls: ['./add-strategies-coins.component.scss']
})
export class AddStrategiesCoinsComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Add Strategy');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-coins/strategies/list",
      text: "List Strategies"
    });
  }

}
