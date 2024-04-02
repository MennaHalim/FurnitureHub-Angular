import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { userInfo } from '../../../Shared/Models/user';
import { UserService } from '../../../Shared/Services/user.service';
import { Address } from '../../../Shared/Models/address';
import { AddressService } from '../../../Shared/Services/address.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit, OnDestroy {
  userInfo? : userInfo;
  addresses : Address[] = []
  private InfoSubscription: Subscription | undefined;
  private AddressSubscription: Subscription | undefined;

  constructor(private userService: UserService,
    private addressServices : AddressService){}
  
  ngOnInit(): void {
    // this.getUserInfo();
    // this.getDefaultAddress();
  }

  getUserInfo(){
    this.InfoSubscription = this.userService.getUserInfo().subscribe((data) => this.userInfo = data)
  }

  getDefaultAddress(){
    this.AddressSubscription = this.addressServices.GetAllAddresses().subscribe((data) => this.addresses = data)
  }

  ngOnDestroy(): void {
    this.InfoSubscription?.unsubscribe();
    this.AddressSubscription?.unsubscribe();
  }


}
