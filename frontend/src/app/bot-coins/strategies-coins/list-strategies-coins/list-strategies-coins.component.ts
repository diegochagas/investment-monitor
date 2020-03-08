import { Component, OnInit } from '@angular/core';

import {
  HeaderService
} from 'src/app/shared';


@Component({
  selector: 'app-list-strategies-coins',
  templateUrl: './list-strategies-coins.component.html',
  styleUrls: ['./list-strategies-coins.component.scss']
})
export class ListStrategiesCoinsComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Strategies');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({
      url: "/bot-coins/strategies/add",
      text: "Add Strategy"
    });
  }

}
