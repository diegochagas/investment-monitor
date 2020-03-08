import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  SocketService,
  WhiteLabelService
} from 'src/app/shared';

@Component({
  selector: 'app-bot-coins',
  templateUrl: './bot-coins.component.html',
  styleUrls: ['./bot-coins.component.scss']
})
export class BotCoinsComponent implements OnInit {
  type = 'bot-coins';

  constructor(
    private socketService: SocketService,
    private whiteLabelService: WhiteLabelService,
    private title: Title
  ) {
    this.whiteLabelService.setTheme(this.type);

    this.title.setTitle('Bot Coins');
  }

  ngOnInit() {
    this.socketService.initSocket();

    localStorage.setItem('project', this.type);
  }

}
