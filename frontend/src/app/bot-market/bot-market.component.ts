import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  SocketService,
  WhiteLabelService
} from 'src/app/shared';

@Component({
  selector: 'app-bot-market',
  templateUrl: './bot-market.component.html',
  styleUrls: ['./bot-market.component.scss']
})
export class BotMarketComponent implements OnInit {
  type = 'bot-market';

  constructor(
    private socketService: SocketService,
    private whiteLabelService: WhiteLabelService,
    private title: Title
  ) {
    this.whiteLabelService.setTheme(this.type);

    this.title.setTitle('Bot Market');
  }

  ngOnInit() {
    this.socketService.initSocket();

    localStorage.setItem('project', this.type);
  }

}
