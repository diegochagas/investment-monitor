import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddProfilesGeneralComponent,
  ListProfilesGeneralComponent,
  ProfilesGeneralComponent,
  ViewProfilesGeneralComponent
} from './';

@NgModule({
  declarations: [
    ProfilesGeneralComponent,
    AddProfilesGeneralComponent,
    ListProfilesGeneralComponent,
    ViewProfilesGeneralComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ProfilesGeneralModule { }
