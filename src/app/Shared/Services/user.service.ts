import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from '../Models/user';
import { Observable } from 'rxjs';
import { baseURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = baseURL+'/api/User';

  constructor(private httpClient: HttpClient) {}

  getUserInfo(): Observable<userInfo> {    
    return this.httpClient.get<userInfo>(`${this.url}/getUserInfo`);
  }

  editName(firstName: string, lastName: string): Observable<any> {
    return this.httpClient.put(`${this.url}/editName`, { firstName, lastName });
  }

  changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.httpClient.post(`${this.url}/ChangePassword`, { currentPassword, newPassword, confirmPassword });
  }

  changeEmail(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.url}/ChangeEmail`, { email, password });
  }

  validatePassword(currentPassword: string): Observable<any> {
    return this.httpClient.post(`${this.url}/ValidatePassword`, { currentPassword });
  }
  
}
