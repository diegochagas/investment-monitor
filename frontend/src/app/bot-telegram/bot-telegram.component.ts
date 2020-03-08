import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import {
  WhiteLabelService
} from 'src/app/shared';

@Component({
  selector: 'app-bot-telegram',
  templateUrl: './bot-telegram.component.html',
  styleUrls: ['./bot-telegram.component.scss']
})
export class BotTelegramComponent implements OnInit {
  type = 'bot-telegram';

  constructor(
    private title: Title,
    private whiteLabelService: WhiteLabelService
  ) {
    this.whiteLabelService.setTheme(this.type);

    this.title.setTitle('Bot Telegram');

    localStorage.setItem('project', this.type);
  }

  ngOnInit() {
  }

}
