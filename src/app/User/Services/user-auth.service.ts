import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private AuthUrl: string = 'http://localhost:5016/api/Account/login';
  private isUserLoggedSubject: BehaviorSubject<boolean>;
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
    this.isUserLoggedSubject = new BehaviorSubject<boolean>(this.UserState);
  }

  get UserState(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.AuthUrl, {
      email: username,
      password: password
    }).pipe(
      tap((response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.isUserLoggedSubject.next(true);
      })
    );
  }

  logout() {
    console.log("Logging out...");
    localStorage.removeItem('token');
    this.isUserLoggedSubject.next(false);
  }
}
