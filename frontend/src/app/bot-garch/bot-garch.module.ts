import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StrategiesGarchModule } from './strategies-garch/strategies-garch.module';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
  return [stock, more];
}

import {
  BotGarchComponent,
  DashboardGarchComponent,
  RobotsGarchComponent
} from './';

@NgModule({
  declarations: [
    BotGarchComponent,
    DashboardGarchComponent,
    RobotsGarchComponent
  ],
  imports: [
    AppRoutingModule,
    ChartModule,
    CommonModule,
    SharedModule,
    StrategiesGarchModule
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules
    }
  ]
})
export class BotGarchModule { }
