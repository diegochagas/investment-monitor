import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  FiltersService,
  RobotsCoinsService,
  RobotsGarchService,
  RobotsMarketService,
  RobotsTelegramService
} from '../../../services';

@Component({
  selector: 'app-data-strategy',
  templateUrl: './data-strategy.component.html',
  styleUrls: ['./data-strategy.component.scss']
})
export class DataStrategyComponent implements OnInit {
  strategyForm: FormGroup;

  strategies = [];

  selected;

  spinner = false;

  project;

  constructor(
    private filtersService: FiltersService,
    private robotsCoinsService: RobotsCoinsService,
    private robotsGarchService: RobotsGarchService,
    private robotsMarketService: RobotsMarketService,
    private robotsTelegramService: RobotsTelegramService,
    public formBuilder: FormBuilder,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.strategyForm = formBuilder.group({
      strategy: ''
    });
  }

  ngOnInit() {
    this.selected = this.data.optionSelected;

    this.spinner = true;

    this.project = localStorage.getItem('project');

    this.filtersService.listStrategies(this.project).subscribe((response: any[]) => {
      this.strategies = response['data'];

      this.strategyForm.patchValue({
        strategy: this.data.optionSelected
      });

      this.spinner = false;
    });
  }

  changeStrategy(val) {
    if (val.isUserInput && val.source.value != this.selected) {
      let res = _.filter(this.strategies, function(item) { return item.presentationName == val.source.value });

      let raw = { strategyId: res[0]._id };

      this.spinner = true;

      if (this.project == 'bot-market') {
        this.robotsMarketService.updateStrategy(this.data.instanceId, raw).subscribe((response: any) => {
          if (response.data) {
            this.matDialog.closeAll();
          }
        });
      }

      if (this.project == 'bot-telegram') {
        this.robotsTelegramService.updateStrategy(this.data.instanceId, raw).subscribe((response: any) => {
          if (response.data) {
            this.matDialog.closeAll();
          }
        });
      }

      if (this.project == 'bot-garch') {
        this.robotsGarchService.updateStrategy(this.data.instanceId, raw).subscribe((response: any) => {
          if (response.data) {
            this.matDialog.closeAll();
          }
        });
      }

      if (this.project == 'bot-coins') {
        this.robotsCoinsService.updateStrategy(this.data.instanceId, raw).subscribe((response: any) => {
          if (response.data) {
            this.matDialog.closeAll();
          }
        });
      }
    }
  }

}
