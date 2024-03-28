import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EqualToDirective } from '../../Directives/equalTo.directive';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { RegistrationUser } from '../../Shared/Models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,NgIf,FormsModule,EqualToDirective, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  firstName='';
  lastName='';
  newEmail = '';
  newPassword='';
  confirmPassword='';

  constructor(private fb: FormBuilder, private authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [ Validators.required],
      lastName: [Validators.required],
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLength(6)],
      confirmPassword: [ Validators.required]
    });
  }

  onSubmit() {
      if (this.signupForm.valid) {
        const newUser = new RegistrationUser(this.firstName, this.lastName, this.newEmail, this.newPassword, this.confirmPassword); 
        this.authService.register(newUser).subscribe(() => {
          console.log('Registration successful');
          this.router.navigate(['/home']); 
        }, error => {
          console.error('Registration failed:', error);
        });
      } else {
        debugger
        Object.keys(this.signupForm.controls).forEach(field => {
          const control = this.signupForm.get(field);
          if (control?.invalid) {
            console.log(`Validation error in ${field}:`);
            const errors = control?.errors;
            console.log(errors);
          }
        });
      }
    
  }

  goBack() {
   
    console.log('Going back...'); 
  }
}