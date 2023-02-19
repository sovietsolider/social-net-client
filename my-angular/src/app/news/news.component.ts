import { Component, OnInit } from '@angular/core';
import {RealTimeNewsService} from "../real-time-news.service";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  html_content = '';
  user;
  friends;
  message='';
  modalDisplayStyle = 'none';

  constructor(private http: HttpClient, private realtimeNewsService: RealTimeNewsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("NG INIT");
    this.realtimeNewsService.on_created_news(() => this.ngOnInit())
    this.html_content = '';
    this.authService.getUser(sessionStorage.getItem("user_id")).subscribe((res)=> {
      this.user = JSON.parse(JSON.stringify(res));
      this.authService.getFriends(sessionStorage.getItem("user_id")).subscribe((res)=> {

        this.friends = JSON.parse(JSON.stringify(res));
        console.log(this.user);

        for(const item of this.user.news) {
          this.html_content += "<div class='card mt-2'><div class=card-header>"+this.user.full_name+"</div><div class=card-body><p class=card-text>"+item+"</p></div></div>";
        }
        for(const v of this.friends) {
          for(const item of v.news) {
            this.html_content += "<div class='card mt-2'><div class=card-header>"+v.full_name+"</div><div class=card-body><p class=card-text>"+item+"</p></div></div>";
          }
        }

      });
    });
}


  addNews() {
    console.log("ADD");
    this.http.post("https://localhost:3000/addNews", {user: this.user, news: this.message}, {responseType: 'text'}).subscribe(data => {
      this.user = JSON.parse(data);
      this.http.post("http://localhost:5000/api/addNews", {user: this.user, friends: this.friends}, {responseType: 'text'}).subscribe(data => {
        console.log("USER NEWS: "+this.user.news);
      })
    })
  }

  openModal() {
    this.modalDisplayStyle = "block";
  }
  closeModal() {
    this.modalDisplayStyle = "none";
    this.addNews();
    //console.log(this.user.news);
  }
  closeModalWithoutAddingNews() {
    this.modalDisplayStyle = "none";
  }

}
