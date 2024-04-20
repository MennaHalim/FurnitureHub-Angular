import { ApplicationModule, Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { userInfo } from '../../../Shared/Models/user';
import { UserService } from '../../../Shared/Services/user.service';
import { Subscription } from 'rxjs';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validate } from 'uuid';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-information',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent implements OnInit, OnDestroy{
  firstName: string = '';
  lastName: string = '';
  newEmail: string = '';
  password: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  editEmail: boolean = false;
  editPassword: boolean = false;
  userServiceSubscription : Subscription | undefined;
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined


  constructor(private userService: UserService,
    private translate: TranslateService,
    private router : Router) {}
  

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.getUserInfo().subscribe(data=>{
      this.firstName = data.firstName;
      this.lastName = data.lastName;
    })
    
    this.lang = this.detectLanguage() || 'en';
    document.documentElement.lang = this.lang;

    this.translate.use(this.lang);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });

  }

  private detectLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      localStorage.setItem("lang", 'en');
      lang == 'en';
    }

    return lang;
  }

  ngOnDestroy(): void {
   this.userServiceSubscription?.unsubscribe()
   this.langChangeSubscription?.unsubscribe()
  }

  updateEmail() {
    // if (this.newEmailInvalid){
    this.validateAndUpdateUserInfo(() => {
      this.userService.changeEmail(this.newEmail, this.password).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/account']);

        },
        error => {
          console.error(error);
          this.errorMessage = error.error.message ;
        }
      );
    });
  // }
  }

  updatePassword() {
    this.validateAndUpdateUserInfo(() => {
      this.userService.changePassword(this.currentPassword, this.newPassword, this.confirmPassword).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/account']);

        },
        error => {
          console.error(error);
          this.errorMessage = error.error.message;
        }
      );
    });
  }

  private validateAndUpdateUserInfo(callback: () => void) {
    this.password = this.password == ''? this.currentPassword: this.password;
    this.userService.validatePassword(this.password).subscribe(
      response => {
        console.log(response);
        this.userService.editName(this.firstName, this.lastName).subscribe(
          response => {
            console.log(response);
            callback(); 
          },
          error => {
            console.error(error);
            this.errorMessage = error.error.message;
          }
        );
      },
      error => {
        console.error(error);
        this.errorMessage = error.error.message;
        this.password = '';

      }
    );
  }



  firstNameTouched: boolean = false;
  lastNameTouched: boolean = false;
  newEmailTouched: boolean = false;
  passwordTouched: boolean = false;
  currentPasswordTouched: boolean = false;
  newPasswordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;

  get firstNameInvalid(): boolean {
    return !this.firstName && this.firstNameTouched;
  }

  get lastNameInvalid(): boolean {
    return !this.lastName && this.lastNameTouched;
  }

  get newEmailInvalid(): boolean {
    return !this.newEmail && this.newEmailTouched;
  }

  get passwordInvalid(): boolean {
    return !this.password && this.passwordTouched;
  }

  get currentPasswordInvalid(): boolean {
    return !this.currentPassword && this.currentPasswordTouched;
  }

  get newPasswordInvalid(): boolean {
    return !this.newPassword && this.newPasswordTouched;
  }

  get confirmPasswordInvalid(): boolean {
    return this.confirmPassword !== this.newPassword && this.confirmPasswordTouched;
  }
}