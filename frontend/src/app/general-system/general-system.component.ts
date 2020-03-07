import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  WhiteLabelService
} from 'src/app/shared';

@Component({
  selector: 'app-general-system',
  templateUrl: './general-system.component.html',
  styleUrls: ['./general-system.component.scss']
})
export class GeneralSystemComponent implements OnInit {
  type = 'general-system';

  constructor(
    private whiteLabelService: WhiteLabelService,
    private title: Title
  ) {
    this.whiteLabelService.setTheme(this.type);

    this.title.setTitle('General System');

    localStorage.setItem('project', this.type);
  }

  ngOnInit() {
  }

}
