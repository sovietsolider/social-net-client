import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) { }
  public getUsers(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
}
