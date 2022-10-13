import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';
import { UserSignupPageComponent } from './components/user-signup-page/user-signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './components/auth/http-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UserDetailsPageComponent,
    UserSignupPageComponent,
    LoginPageComponent
  ],
    imports: [
      RouterModule.forRoot([]),
      HttpClientModule,
      BrowserModule,
      ReactiveFormsModule,
      AppRoutingModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
