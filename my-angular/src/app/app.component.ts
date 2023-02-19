import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { UsersService } from "../services/users.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {RealTimeNewsService} from "./real-time-news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  isAdmin;
  constructor(public authService: AuthService, private router: Router, private elementRef: ElementRef) {
  }

  public goToProfile() {
    console.log(this.authService.user);
    if(this.authService.logIn)
      this.router.navigate(["profile"]);
    else
      this.router.navigate(["login"]);

  }

  public goToNews() {
    if(this.authService.logIn)
      this.router.navigate(["news"]);
    else
      this.router.navigate(["login"]);
  }



}
