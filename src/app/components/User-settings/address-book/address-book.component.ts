import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Address } from '../../../Shared/Models/address';
import { AddressService } from '../../../Shared/Services/address.service';
import { transition } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, UnsubscriptionError } from 'rxjs';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})
export class AddressBookComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  addressId = 0;
  addresses: Address[] = [];
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder,
     private addressService: AddressService,
     private router : Router,
     private translate: TranslateService) { }
  

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      phone: ['', Validators.required],
      fax: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.addressService.GetAllAddresses().subscribe(addresses => {
      this.addresses = addresses;
      if (this.addresses.length > 0) {
        const userAddress = this.addresses[0];
        this.addressId = userAddress.id;
        this.fillFormWithAddress(userAddress);
      }
    });

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

  fillFormWithAddress(address: Address) {
    this.contactForm.patchValue({
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company,
      phone: address.phoneNumber,
      fax: address.fax,
      street: address.streetAdress,
      city: address.city,
      zip: address.postalCode,
      country: address.country
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const addressData: Address = {
        id: this.addressId,
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        company: this.contactForm.value.company,
        phoneNumber: this.contactForm.value.phone,
        fax: this.contactForm.value.fax,
        streetAdress: this.contactForm.value.street,
        city: this.contactForm.value.city,
        country: this.contactForm.value.country,
        postalCode: this.contactForm.value.zip
      };
      if (this.addressId === 0) {
        this.addressService.Addddresse(addressData).subscribe(response => {
          console.log('New address added successfully:', response);
        }, error => {
          console.error('Error adding new address:', error);
        });
      } else {
        this.addressService.Editddresse(addressData).subscribe(response => {
          console.log('Address updated successfully:', response);
        }, error => {
          console.error('Error updating address:', error);
        });
      }
      this.router.navigate(['/account']);
    } else {
      console.log('Form is invalid. Please fill out all required fields.');
    }
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }
}