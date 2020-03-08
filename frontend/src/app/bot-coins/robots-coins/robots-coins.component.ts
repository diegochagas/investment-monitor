import { Component, OnInit } from '@angular/core';

import {
  HeaderService
} from 'src/app/shared';

@Component({
  selector: 'app-robots-coins',
  templateUrl: './robots-coins.component.html',
  styleUrls: ['./robots-coins.component.scss']
})
export class RobotsCoinsComponent implements OnInit {

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('List Robots');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({});
  }

}
