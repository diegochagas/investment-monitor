import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exposition',
  templateUrl: './exposition.component.html',
  styleUrls: ['./exposition.component.scss']
})
export class ExpositionComponent implements OnInit {
  @Input() exposition;

  constructor() { }

  ngOnInit() {
  }

}
