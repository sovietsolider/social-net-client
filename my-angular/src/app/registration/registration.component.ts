import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {HttpClientModule, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  email = '';
  password ='';
  date = '';
  full_name = '';
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  addUser() {
    return this.http.post("https://localhost:3000/adduser", {email: this.email,password: this.password,birth_date: this.date, full_name: this.full_name})
  }

  signUp() {
    let status;
    if(this.email!== '' && this.password!== '' && this.date!== '' && this.full_name!== '') {
      this.http.post("https://localhost:3000/adduser", {
        email: this.email,
        password: this.password,
        birth_date: this.date,
        full_name: this.full_name
      })
        .subscribe((resp: any) => {
            console.log("AAAAAAAA");
            this.router.navigate(['login']);
            //status = resp;
            //this.authService.login(this.email, this.password);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.error === "forbidden") {
              alert("Email already exists");
            }

          }
        )
    }
    else
      alert("Name, email and password is required");


  }

}
