import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { NgxDaterangepickerMd } from 'ngx-datepicker-material';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';

import {
  CardListComponent,
  DataStrategyComponent,
  DataTradeComponent,
  DateFormatPipe,
  DragDropDirective,
  DragdropXlsxComponent,
  ExpositionComponent,
  FormComponent,
  HeaderComponent,
  InputDateComponent,
  LoginTimeoutDirective,
  MenuComponent,
  PairsComponent,
  PositiveNumberPipe,
  ProfilesConfig,
  ReplacePipe,
  RobotsListComponent,
  SafePipe,
  ScrollDirective,
  SelectOptionsComponent,
  TableComponent,
  ViewProfitsComponent,
  ViewStrategyComponent
} from './';

@NgModule({
  declarations: [
    CardListComponent,
    DataStrategyComponent,
    DataTradeComponent,
    DateFormatPipe,
    DragDropDirective,
    DragdropXlsxComponent,
    ExpositionComponent,
    FormComponent,
    HeaderComponent,
    InputDateComponent,
    LoginTimeoutDirective,
    MenuComponent,
    PairsComponent,
    PositiveNumberPipe,
    ReplacePipe,
    RobotsListComponent,
    SafePipe,
    ScrollDirective,
    SelectOptionsComponent,
    TableComponent,
    ViewProfitsComponent,
    ViewStrategyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    NgxDaterangepickerMd,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CardListComponent,
    DragDropDirective,
    DragdropXlsxComponent,
    ExpositionComponent,
    FormComponent,
    HeaderComponent,
    InputDateComponent,
    LoginTimeoutDirective,
    MenuComponent,
    PairsComponent,
    RobotsListComponent,
    ScrollDirective,
    SelectOptionsComponent,
    TableComponent,
    ViewProfitsComponent,
    ViewStrategyComponent
  ],
  providers: [
    MenuComponent,
    ProfilesConfig
  ],
  entryComponents: [
    DataStrategyComponent,
    DataTradeComponent
  ]
})
export class SharedModule { }
