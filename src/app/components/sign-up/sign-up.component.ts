import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EqualToDirective } from '../../Directives/equalTo.directive';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,NgIf,FormsModule,EqualToDirective],
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission
      console.log(this.signupForm.value);
    }
  }
  goBack() {
   
    console.log('Going back...'); 
  }
}