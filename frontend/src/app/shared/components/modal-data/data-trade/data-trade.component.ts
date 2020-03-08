import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-trade',
  templateUrl: './data-trade.component.html',
  styleUrls: ['./data-trade.component.scss']
})
export class DataTradeComponent implements OnInit {

  constructor(
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
