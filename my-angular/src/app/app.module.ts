import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {Router, RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import { RegistrationComponent } from './registration/registration.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'news', component: NewsComponent}
    ]),
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
