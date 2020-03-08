import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {
  @Input() title = "";
  @Input() selectedDate = {};

  @Output() selected = new EventEmitter();

  constructor() { }

  dateSelected(val) {
    this.selected.emit(val);
  }

}
