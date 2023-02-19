import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }
  Login() {
    console.log("you are logging in")
    this.authService.login(this.email, this.password);
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

}
