import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExchangeGeneralModule } from './exchange-general/exchange-general.module';
import { GroupsGeneralModule } from './groups-general/groups-general.module';
import { ProfilesGeneralModule } from './profiles-general/profiles-general.module';
import { SubscribersGeneralModule } from './subscribers-general/subscribers-general.module';

import {
  DashboardGeneralComponent,
  GeneralSystemComponent,
  UsersGeneralComponent
} from './';

@NgModule({
  declarations: [
    DashboardGeneralComponent,
    GeneralSystemComponent,
    UsersGeneralComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ExchangeGeneralModule,
    GroupsGeneralModule,
    ProfilesGeneralModule,
    SharedModule,
    SubscribersGeneralModule
  ]
})
export class GeneralSystemModule { }
