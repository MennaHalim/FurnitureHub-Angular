import { ApplicationModule, Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { userInfo } from '../../../Shared/Models/user';
import { UserService } from '../../../Shared/Services/user.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-information',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent {
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

  constructor(private userService: UserService,
    private router : Router) {}

  updateEmail() {
    this.validateAndUpdateUserInfo(() => {
      this.userService.changeEmail(this.newEmail, this.password).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/account']);

        },
        error => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
    });
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
          this.errorMessage = error.message;
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
            this.errorMessage = error.message;
          }
        );
      },
      error => {
        console.error(error);
        this.errorMessage = error.message;
        this.password = '';

      }
    );
  }
}