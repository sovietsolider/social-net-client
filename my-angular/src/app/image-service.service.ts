import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) { }

  uploadPhoto(form, file: File, onUpload: ()=> void) {

    let formParams = new FormData(form);/*
    formParams.append('file', file);
    formParams.append('user_id', sessionStorage['user_id']);
    formParams.append('name', 'photoData');*/
    formParams.append('user_id', sessionStorage['user_id']);

    this.httpClient.post("https://localhost:3000/addPhoto", formParams).subscribe(res=>{
      onUpload();
    })
  }
}
