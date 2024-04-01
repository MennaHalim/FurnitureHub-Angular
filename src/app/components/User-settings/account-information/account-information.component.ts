import { ApplicationModule, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userInfo } from '../../../Shared/Models/user';
import { UserService } from '../../../Shared/Services/user.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-information',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent {
  editEmail: boolean = false;
  editPassword: boolean = false;

  updateEmail() {
    // Logic to update email
    console.log('Email updated');
  }

  updatePassword() {
    // Logic to update password
    console.log('Password updated');
  }
 
}
