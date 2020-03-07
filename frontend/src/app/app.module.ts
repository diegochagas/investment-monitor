import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotCoinsComponent } from './bot-coins/bot-coins.component';
import { BotGarchComponent } from './bot-garch/bot-garch.component';
import { BotMarketComponent } from './bot-market/bot-market.component';
import { BotTelegramComponent } from './bot-telegram/bot-telegram.component';
import { GeneralSystemComponent } from './general-system/general-system.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BotCoinsComponent,
    BotGarchComponent,
    BotMarketComponent,
    BotTelegramComponent,
    GeneralSystemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
