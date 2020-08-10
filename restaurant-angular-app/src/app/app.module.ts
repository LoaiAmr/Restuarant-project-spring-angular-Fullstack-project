import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';





@NgModule({
  declarations: [
    AppComponent,
    headerComponent,   
  ],
  imports: [
    BrowserModule, /** it can use once in the whole of application to access ngFor and ngIf */
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
