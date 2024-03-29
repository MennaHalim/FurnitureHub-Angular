import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../Shared/Services/basket.service';
import { DeliveryMethodService } from '../../Shared/Services/delivery-method.service';
import { IDeliverMethod } from '../../Shared/Models/order';
import { Basket, IBasket, IBasketItem } from '../../Shared/Models/basket';
import { NumberPadPipe } from '../../Shared/Pipes/number-pad.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NumberPadPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _BasketService: BasketService,
    private _DeliveryMethodService: DeliveryMethodService) { }

  cartId: string | null = '';
  basket!: Basket | null;
  deliveryMethods!: IDeliverMethod[];
  basketSubTotal: number = 0;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      }
    })


    this._DeliveryMethodService.getDeliveryMethods().subscribe({
      next: (deliveryMethods) => {
        this.deliveryMethods = deliveryMethods;
      }
    })

    this._BasketService.getUserBasketObs().subscribe({
      next: (Basket) => {
        this.basket = Basket;

        this.calcBascketSubTotal();
      }
    });


  }




  shippingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]),
    street: new FormControl('', Validators.required),
    city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    country: new FormControl('', Validators.required)
  })

  deliveryMethodsForm: FormGroup = new FormGroup({
    shipping_method: new FormControl('', Validators.required)
  });

  paymentForm = new FormGroup({
    ccNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
    expiry: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$'), this.expiryValidator]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
    cHolder: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')])
  });

  expiryValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const [month, year] = control.value.split('/');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const expiryYear = Number(year) + (Math.floor(currentYear / 100)) * 100;

    if (Number(month) < 1 || Number(month) > 12) {
      return { 'expiryValidator': true };
    }

    if (expiryYear <= currentYear || (expiryYear <= currentYear && Number(month) < currentMonth)) {
      return { 'expiryValidator': true };
    }

    return null;
  }


  validateForms() {
    this.shippingAddressForm.markAllAsTouched();
    this.deliveryMethodsForm.markAllAsTouched();
    this.paymentForm.markAllAsTouched();


    if (this.shippingAddressForm.valid &&
      this.deliveryMethodsForm.valid &&
      this.paymentForm) {
      this._BasketService.checkOut(this.cartId, this.shippingAddressForm.value).subscribe();
    }
  }


  //-------------------------------------------
  //__________________Counter__________________
  //-------------------------------------------

  counter: number = 1;

  incrementCounter(item: IBasketItem) {
    item.productQuantity++;
    this.updateBascketItemsQuantity();
    this.basketSubTotal++;
  }

  decrementCounter(item: IBasketItem) {
    if (item.productQuantity - 1 > 0) {
      item.productQuantity--;
      this.updateBascketItemsQuantity();
    }
  }

  //-------------------------------------------
  //___________________________________________
  //-------------------------------------------

  updateBascketItemsQuantity() {
    this._BasketService.addToOrUpdateCart(this.basket).subscribe({
      next: (Basket) => {
        this.basket = Basket;
        this.calcBascketSubTotal();
      }
    });
  }

  calcBascketSubTotal() {
    if (this.basket !== null && this.basket.basketItems !== null) {
      this.basketSubTotal = 0;
      for (let index = 0; index < this.basket.basketItems.length; index++) {
        const basketItem = this.basket.basketItems[index];
        this.basketSubTotal += (basketItem.productPrice * basketItem.productQuantity);
      }
    }
  }


}
