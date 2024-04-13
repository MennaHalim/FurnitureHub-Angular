import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationUser } from '../Models/user';
import { baseURL } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private AuthUrl: string = baseURL+'/api/Account/login';
  private registerUrl: string = baseURL+'/api/Account/register';
  private isUserLoggedSubject: BehaviorSubject<boolean>;
  private jwtHelper = new JwtHelperService();
  loginSuccessEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        this.loginSuccessEvent.emit(true);
        this.isUserLoggedSubject.next(true);
      })
    );
  }

  logout() {
    console.log("Logging out...");
    localStorage.removeItem('token');
    this.isUserLoggedSubject.next(false);
  }

  register(user: RegistrationUser) {
    return this.httpClient.post<any>(this.registerUrl, user).pipe(
      tap((response) => {
        console.log('Registration successful:', response);
        //automatic login
        this.login(user.email, user.password).subscribe();
      })
    );
  }
}
