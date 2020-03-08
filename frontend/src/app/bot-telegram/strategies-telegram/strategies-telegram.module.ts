import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddStrategiesTelegramComponent,
  ListStrategiesTelegramComponent,
  StrategiesTelegramComponent,
  ViewStrategiesTelegramComponent
} from './';

@NgModule({
  declarations: [
    AddStrategiesTelegramComponent,
    ListStrategiesTelegramComponent,
    StrategiesTelegramComponent,
    ViewStrategiesTelegramComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class StrategiesTelegramModule { }
