import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../User/Services/user-auth.service';
import { RegistrationUser } from '../../../User/Models/register/user';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private http: HttpClient, private router: Router, private AuthService: UserAuthService) { }

  authTest() {
    this.http.get<any>('http://localhost:5016/WeatherForecast/UserHomePage').subscribe(
      response => {
        this.router.navigate(['/cart']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }
  userTest(){
    this.http.get<any>('http://localhost:5016/WeatherForecast/UserHomePage').subscribe(
      response => {
        this.router.navigate(['/productList']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );

  }
  adminTest(){
    this.http.get<any>('http://localhost:5016/WeatherForecast/AdminHomePage').subscribe(
      response => {
        this.router.navigate(['/productList']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );

  }

  logout() {
    // this.AuthService.logout();
    this.AuthService.register(new RegistrationUser("user2", "user2", "user2@example.com", "string0A*", "string0A*"))
    .subscribe(response => {
      console.log(response);
    });
  }
}
