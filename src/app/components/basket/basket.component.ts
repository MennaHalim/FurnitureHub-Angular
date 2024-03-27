import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Shared/Services/basket.service';
import { Basket, IBasketItem } from '../../Shared/Models/basket';
import { Subscription, concatWith } from 'rxjs';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { NumberPadPipe } from '../../Shared/Pipes/number-pad.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NumberPadPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  constructor(private _BasketService: BasketService,
    private _router: Router) { }

  basket!: Basket | null;
  subscription: Subscription | undefined;

  async ngOnInit() {
    await this._BasketService.getUserBasket();
    this.basket = this._BasketService.basket;
    this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);
  }




  removeFromBasket(productId: number) {
    if (this.basket !== null) {
      for (let index = 0; index < this.basket.basketItems.length; index++) {
        if (this.basket.basketItems[index].productId === productId) {
          this.basket.basketItems.splice(index, 1);
          break;
        }
      }
      this._BasketService.addToOrUpdateCart(this.basket).subscribe();
      this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);
      this._router.navigate(['/basket']);
    }
  }

  clearBasket() {
    if (this.basket !== null) {
      this.basket.basketItems = [];
      this._BasketService.addToOrUpdateCart(this.basket).subscribe();
      this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);
      this._router.navigate(['/basket']);
    }
  }





  //-------------------------------------------
  //__________________Counter__________________
  //-------------------------------------------

  counter: number = 1;

  incrementCounter(item: IBasketItem) {
    item.productQuantity++;
  }

  decrementCounter(item: IBasketItem) {
    if (item.productQuantity - 1 > 0) {
      item.productQuantity--;
    }
  }

  //-------------------------------------------
  //___________________________________________
  //-------------------------------------------
}