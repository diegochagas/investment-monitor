import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  SocketService,
  WhiteLabelService
} from 'src/app/shared';

@Component({
  selector: 'app-bot-garch',
  templateUrl: './bot-garch.component.html',
  styleUrls: ['./bot-garch.component.scss']
})
export class BotGarchComponent implements OnInit {
  type = 'bot-garch';

  constructor(
    private socketService: SocketService,
    private whiteLabelService: WhiteLabelService,
    private title: Title
  ) {
    this.whiteLabelService.setTheme(this.type);

    this.title.setTitle('Bot Garch');
  }

  ngOnInit() {
    this.socketService.initSocket();

    localStorage.setItem('project', this.type);
  }

}
