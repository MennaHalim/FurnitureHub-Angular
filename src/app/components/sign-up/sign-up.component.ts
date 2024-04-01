import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { EqualToDirective } from '../../Directives/equalTo.directive';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { RegistrationUser } from '../../Shared/Models/user';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = passwordRegex.test(control.value);

    if (!valid) {
      control.setErrors({ 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.': true });
      return { 'invalidPassword ': true };
    }

    control.setErrors(null);
    return null;
  };
}


function confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const passwordControl = formGroup.get(passwordKey);
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);

    if (passwordControl && confirmPasswordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = confirmPasswordControl.value;

      if (passwordValue !== confirmPasswordValue) {
        confirmPasswordControl.setErrors({ 'passwordMismatch': true });
        return { 'passwordMismatch': true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    }

    return null;
  };
}






@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, EqualToDirective, ReactiveFormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  firstName = '';
  lastName = '';
  newEmail = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage: string = '';
  private langChangeSubscription: Subscription | undefined
  lang: string = 'en';


  constructor(private fb: FormBuilder,
    private authService: UserAuthService,
    private router: Router,
    private translate: TranslateService,) { 
    this.translate.use(localStorage.getItem('lang') || 'en');

    this.langChangeSubscription = translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });
    }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      newEmail: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: confirmPasswordValidator('newPassword', 'confirmPassword')
    });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      const { firstName, lastName, newEmail, newPassword, confirmPassword } = this.signupForm.value;

      this.authService.register(new RegistrationUser(firstName, lastName, newEmail, newPassword, confirmPassword))
        .subscribe(() => {
          console.log('Registration successful');
          this.router.navigate(['/home']);
        }, error => {
          if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
            const errorMessage = error.error.errors[0];
            console.error('Registration failed:', errorMessage);
            this.errorMessage = errorMessage;
          } else {
            console.error('Registration failed:', error.message);
            this.errorMessage = error.message;
          }
        });
    } else {
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
    this.router.navigate(['/home']);
  }

  getError(controlName: string, errorName: string) {
    const control = this.signupForm.get(controlName);
    return control?.hasError(errorName) ? control?.getError(errorName).message : '';
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe;
  }

}