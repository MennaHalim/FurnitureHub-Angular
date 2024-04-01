import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:5016/api/User';

  constructor(private httpClient: HttpClient) {}

  getUserInfo(): Observable<userInfo> {    
    return this.httpClient.get<userInfo>(this.url +"/getUserInfo");
  }
}
