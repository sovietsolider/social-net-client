import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user;
  public uri = 'http://localhost:5000/api';
  public token;
  public users;
  constructor(private http: HttpClient,private router: Router) { }

  getUsers() {
    return this.http.get("https://localhost:3000/users")

  }

  getUser(id) {
    return this.http.get("https://localhost:3000/users").pipe(map((res: any)=>{
      //let users = JSON.parse(JSON.stringify(res));
      res = JSON.parse(JSON.stringify(res));
      for(const user of res) {
        if(id == user.id) {
          return user;
        }
      }
    }));
  }
  getUserPhoto(id) {
    return this.http.get(`https://localhost:3000/user/${id}/photo`).pipe(map((res: any)=>{
      console.log(res);
      return res;
    }));
  }

  getFriends(id) {
    return this.http.get(`https://localhost:3000/user/${id}/getFriendsList`).pipe(map((res: any)=>{
      return res;
    }));
  }

  login(email: string, password: string) {
    this.http.get("https://localhost:3000/users").subscribe(data => {
      this.users = data;
      console.log("M:" + typeof(data));
      this.http.post(this.uri + '/authenticate', {email: email,password: password, all_users: JSON.stringify(this.users)})
        .subscribe((resp: any) => {
          this.user = resp.signed_user;
          console.log(this.user.id);
          this.router.navigate(['profile']);
          sessionStorage.setItem('auth_token', resp.token);
          sessionStorage.setItem('user_id', this.user.id);
          console.log(this.user.email);
        });
    });
  }

  logout() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_id');
    this.router.navigate(['login']);
  }

  public get logIn(): boolean {
    console.log(sessionStorage.getItem('auth_token') !== null);
    return (sessionStorage.getItem('auth_token') !== null);
  }

}
