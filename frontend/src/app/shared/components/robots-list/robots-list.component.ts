import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-robots-list',
  templateUrl: './robots-list.component.html',
  styleUrls: ['./robots-list.component.scss']
})
export class RobotsListComponent implements OnInit, OnChanges {
  @Output() selectedRobot = new EventEmitter();

  @Input() robotsList = [];

  filteredList;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.robotsList) {
      if (!changes.robotsList.firstChange) {
        this.filteredList = this.robotsList;
      }
    }
  }

  searchRobot(search) {
    this.filteredList = this.robotsList.filter(robot => robot.instanceId.includes(search));
  }

  robotTrigger(instanceId) {
    this.selectedRobot.emit(instanceId);
  }
}
