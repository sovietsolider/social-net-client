import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {ImageServiceService} from "../image-service.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  //id: number | undefined;
  //private subscription: Subscription;
  user;
  user_name = '';
  user_birth_date = '';
  userPhotoURI = '';
  user_id = '';
  user_role ='';
  user_status;
  isAdmin;
  file: File | any=null;
  constructor(private activateRoute: ActivatedRoute, public authService: AuthService, private router: Router, private imageService: ImageServiceService) {
    console.log("IM PROFILE CONSTRUCTOR")
    //this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    this.authService.getUser(sessionStorage.getItem("user_id")).subscribe((res)=> {
      this.user = JSON.parse(JSON.stringify(res));
      this.user_name = this.user.full_name;
      this.user_birth_date = this.user.birth_date;
      this.user_id = this.user.id;
      this.isAdmin = this.user.role==="admin";
      this.user_role = this.user.role;
      this.user_status = this.user.status;
      this.userPhotoURI = `https://localhost:3000/images/${this.user.photo}`;
    });
  }



  getPhoto(event) {
    this.file = event.target.files[0];
  }

  uploadPhoto() {
    let form = document.getElementById("photoForm");
    this.imageService.uploadPhoto(form, this.file, ()=>{
      console.log("UPLOAD PHOTO");
    })
    this.userPhotoURI = `https://localhost:3000/images/${this.user.photo}`;
    window.location.reload();
  }




}
