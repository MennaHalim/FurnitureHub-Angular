import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // New property to hold error message

  constructor(private authService: UserAuthService, private router: Router) {} 

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe(
        () => {
          console.log('Login successful');
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Email or password incorrect'; // Set error message
          } else {
            this.errorMessage = 'An error occurred. Please try again later.'; // Fallback message
          }
        }
      );
    }
  }
}
