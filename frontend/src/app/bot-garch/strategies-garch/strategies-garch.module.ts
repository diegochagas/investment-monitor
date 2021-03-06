import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddStrategiesGarchComponent,
  ListStrategiesGarchComponent,
  StrategiesGarchComponent,
  ViewStrategiesGarchComponent
} from './';

@NgModule({
  declarations: [
    StrategiesGarchComponent,
    AddStrategiesGarchComponent,
    ListStrategiesGarchComponent,
    ViewStrategiesGarchComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class StrategiesGarchModule { }
