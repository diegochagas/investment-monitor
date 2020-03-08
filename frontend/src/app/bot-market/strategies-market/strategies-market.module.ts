import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddStrategiesMarketComponent,
  ListStrategiesMarketComponent,
  StrategiesMarketComponent,
  ViewStrategiesMarketComponent
} from './';

@NgModule({
  declarations: [
    StrategiesMarketComponent,
    ListStrategiesMarketComponent,
    ViewStrategiesMarketComponent,
    AddStrategiesMarketComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class StrategiesMarketModule { }
