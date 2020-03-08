import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddExchangeGeneralComponent,
  ExchangeGeneralComponent,
  ListExchangeGeneralComponent,
  ViewExchangeGeneralComponent
} from './';

@NgModule({
  declarations: [
    AddExchangeGeneralComponent,
    ExchangeGeneralComponent,
    ListExchangeGeneralComponent,
    ViewExchangeGeneralComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ExchangeGeneralModule { }
