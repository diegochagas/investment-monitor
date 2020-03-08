import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StrategiesTelegramModule } from './strategies-telegram/strategies-telegram.module';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
  return [stock, more];
}

import {
  BotTelegramComponent,
  DashboardTelegramComponent,
  RobotsTelegramComponent
} from './';

@NgModule({
  declarations: [
    BotTelegramComponent,
    DashboardTelegramComponent,
    RobotsTelegramComponent
  ],
  imports: [
    AppRoutingModule,
    ChartModule,
    CommonModule,
    SharedModule,
    StrategiesTelegramModule
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules
    }
  ]
})
export class BotTelegramModule { }
