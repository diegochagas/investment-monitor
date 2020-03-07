import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  AddGroupsGeneralComponent,
  GroupsGeneralComponent,
  ListGroupsGeneralComponent,
  ViewGroupsGeneralComponent
} from './';

@NgModule({
  declarations: [
    AddGroupsGeneralComponent,
    GroupsGeneralComponent,
    ListGroupsGeneralComponent,
    ViewGroupsGeneralComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class GroupsGeneralModule { }
