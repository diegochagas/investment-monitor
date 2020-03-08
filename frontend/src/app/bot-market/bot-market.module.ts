import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StrategiesMarketModule } from './strategies-market/strategies-market.module';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
  return [stock, more];
}

import {
  BotMarketComponent,
  DashboardMarketComponent,
  RobotsMarketComponent
} from './';

@NgModule({
  declarations: [
    BotMarketComponent,
    DashboardMarketComponent,
    RobotsMarketComponent
  ],
  imports: [
    AppRoutingModule,
    ChartModule,
    CommonModule,
    FormsModule,
    SharedModule,
    StrategiesMarketModule
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules
    }
  ]
})
export class BotMarketModule { }
