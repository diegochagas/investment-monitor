import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddStrategiesCoinsComponent,
  ListStrategiesCoinsComponent,
  StrategiesCoinsComponent,
  ViewStrategiesCoinsComponent
} from './';

@NgModule({
  declarations: [
    AddStrategiesCoinsComponent,
    ListStrategiesCoinsComponent,
    StrategiesCoinsComponent,
    ViewStrategiesCoinsComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class StrategiesCoinsModule { }
