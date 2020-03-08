import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-view-profits',
  templateUrl: './view-profits.component.html',
  styleUrls: ['./view-profits.component.scss']
})
export class ViewProfitsComponent implements OnInit {
  @Input() profits;

  @Input() currencies;

  @Output() selectedData = new EventEmitter();

  selectedDate;

  profitsData;

  constructor() { }

  ngOnInit() {
    this.selectedDate = { startDate: moment().subtract(1, 'days'), endDate: moment() };

    this.profitsData = { startDate: moment(this.selectedDate.startDate).valueOf(), endDate: moment(this.selectedDate.endDate).valueOf(), mainCurrency: 'BTC' };
  }

  setDate(selectedDate) {
    this.selectedDate = selectedDate;

    this.profitsData.startDate = moment(this.selectedDate.startDate).valueOf();

    this.profitsData.endDate = moment(this.selectedDate.endDate).valueOf();

    this.sendData();
  }

  sendData() {
    this.selectedData.emit(this.profitsData);
  }
}
