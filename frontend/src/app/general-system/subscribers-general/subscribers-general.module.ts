import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddSubscribersGeneralComponent,
  ListSubscribersGeneralComponent,
  SubscribersGeneralComponent,
  ViewSubscribersGeneralComponent
} from './';

@NgModule({
  declarations: [
    AddSubscribersGeneralComponent,
    ListSubscribersGeneralComponent,
    SubscribersGeneralComponent,
    ViewSubscribersGeneralComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class SubscribersGeneralModule { }
