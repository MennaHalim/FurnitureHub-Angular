import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../Shared/Services/basket.service';
import { DeliveryMethodService } from '../../Shared/Services/delivery-method.service';
import { IDeliverMethod } from '../../Shared/Models/order';
import { Basket, IBasketItem } from '../../Shared/Models/basket';
import { NumberPadPipe } from '../../Shared/Pipes/number-pad.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NumberPadPipe, CommonModule],
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
  shippingCost: number = 0;


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




  validateForms() {
    this.shippingAddressForm.markAllAsTouched();
    this.deliveryMethodsForm.markAllAsTouched();

    if (this.shippingAddressForm.valid &&
      this.deliveryMethodsForm.valid) {

      this._BasketService.createCheckOutSession(this.basket?.basketId, this.shippingAddressForm.value).subscribe({
        next: (response) => {
          window.open(response.stripeUrl, '_self');
        }
      });

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
        this.basketSubTotal += (basketItem.productPrice * basketItem.productQuantity * (1 - (basketItem.productDiscount / 100)));
      }
    }
  }

  updateDeliveryMethod(event: MouseEvent) {
    const clickedElement = event.target as HTMLInputElement;
    const deliverMethodId = clickedElement.id;

    const idAsNumber = parseInt(deliverMethodId, 10);

    if (!isNaN(idAsNumber)) {
      for (let index = 0; index < this.deliveryMethods.length; index++) {
        const deliverMethod = this.deliveryMethods[index];
        if (idAsNumber == deliverMethod.id) {
          if (this.basket !== null) {
            this.basket.deliveryMethodId = idAsNumber;
            this.basket.shippingPrice = deliverMethod.cost;
            this.shippingCost = this.basket.shippingPrice;
            this._BasketService.addToOrUpdateCart(this.basket).subscribe({
              next: (Basket) => {
                this.basket = Basket;
              }
            });
          }
        }

      }
    }

  }


}
