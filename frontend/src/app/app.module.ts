import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GestureConfig } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { Interceptor } from './app-interceptor.module';

import { BotGarchModule } from './bot-garch/bot-garch.module';
import { BotCoinsModule } from './bot-coins/bot-coins.module';
import { BotMarketModule } from './bot-market/bot-market.module';
import { BotTelegramModule } from './bot-telegram/bot-telegram.module';
import { GeneralSystemModule } from './general-system/general-system.module';

import { SharedModule } from './shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import {
  FrontPageComponent,
  LoginComponent,
  OopsComponent
} from './';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OopsComponent,
    FrontPageComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BotCoinsModule,
    BotGarchModule,
    BotMarketModule,
    BotTelegramModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    GeneralSystemModule,
    HttpClientModule,
    Interceptor,
    LoadingBarModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      allowOutsideClick: false
    })
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
