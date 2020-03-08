import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StrategiesCoinsModule } from './strategies-coins/strategies-coins.module';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
  return [stock, more];
}

import {
  BotCoinsComponent,
  DashboardCoinsComponent,
  RobotsCoinsComponent
} from './';

@NgModule({
  declarations: [
    BotCoinsComponent,
    DashboardCoinsComponent,
    RobotsCoinsComponent
  ],
  imports: [
    AppRoutingModule,
    ChartModule,
    CommonModule,
    SharedModule,
    StrategiesCoinsModule
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules
    }
  ]
})
export class BotCoinsModule { }
