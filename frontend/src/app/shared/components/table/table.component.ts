import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { MatTable } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import {
  DataStrategyComponent,
  DataTradeComponent
} from '../modal-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  @Output() delete   = new EventEmitter();
  @Output() edit     = new EventEmitter();
  @Output() profile  = new EventEmitter();
  @Output() rule     = new EventEmitter();
  @Output() state    = new EventEmitter();
  @Output() strategy = new EventEmitter();
  @Output() checkbox = new EventEmitter();
  @Output() tab      = new EventEmitter();
  @Output() tr       = new EventEmitter();

  @Input() prefixCheckbox;

  @Input() displayedColumns;
  @Input() dataSource;

  @Input() isReverseTable;

  @Input() dataProfiles;

  @Input() tabs;
  @Input() tabsArr = [];

  @Input() checkboxArr = [];

  @Input() statusClass;

  @Input() customStyle;

  tabActive;

  constructor(
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.tabActive = this.tabsArr[0];
  }

  openDiolog(id, instanceId, label, optionSelected) {
    this.matDialog.open(DataStrategyComponent, {
      data: {
        id: id,
        instanceId: instanceId,
        label: label,
        optionSelected: optionSelected
      }
    });
  }

  strategyTrigger(id) {
    this.strategy.emit(id);
  }

  stateTrigger(id, state) {
    this.state.emit({ id: id, state: state });
  }

  editTrigger(id) {
    this.edit.emit(id);
  }

  deleteTrigger(id) {
    this.delete.emit(id);
  }

  profileTrigger(id, profile) {
    this.profile.emit({ id, profile });
  }

  setCheckbox(event, name, path) {
    event.preventDefault();

    this.checkbox.emit({ name: name, path: path });
  }

  ruleTrigger(path, rule) {
    this.rule.emit({ name: this.prefixCheckbox, path: path, rule: rule.value });
  }

  tabTrigger(tab) {
    this.tabActive = tab;

    this.tab.emit(tab);
  }

  isNumber(value) {
    return typeof(value) === 'number';
  }

  isString(value) {
    return typeof(value) === 'string';
  }

  openDialogTradeDetails(data) {
    this.matDialog.open(DataTradeComponent, { data });
  }

  trTrigger(obj) {
    this.tr.emit(obj);
  }
}
