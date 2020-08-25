import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';





@NgModule({
  declarations: [
    AppComponent,
    headerComponent,   
  ],
  imports: [
    BrowserModule, // it can use once in the whole of application to access ngFor and ngIf
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    // HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}) //it allow using 'Csrf' security
  ],

  bootstrap: [AppComponent],
 
})
export class AppModule { }
