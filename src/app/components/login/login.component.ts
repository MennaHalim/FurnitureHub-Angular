import { Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../Shared/Services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username :string = ''
  passwoed :string = ''
  user:boolean = false; //??

  constructor(private AuthService: UserAuthService, private router: Router)
  {

  }

  Login()
  {
    console.log(this.username)
    console.log(this.passwoed)
    
    this.AuthService.login(this.username,this.passwoed).subscribe(
      response => {
        console.log(response);
      },
      
    );
    
    this.user = this.AuthService.UserState;

    if (this.AuthService.UserState){
      this.router.navigate(['/test']);
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
