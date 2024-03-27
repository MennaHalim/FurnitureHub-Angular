import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { Basket, IBasket } from '../Models/basket';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private _HttpClient: HttpClient) { }
  subscription: Subscription | undefined;
  baseUrl: string = 'http://localhost:5016/api/';
  myToken: any = {
    token: JSON.stringify(localStorage.getItem('etoken'))
  }

  basket: Basket = new Basket();

  addToOrUpdateCart(basket: IBasket): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseUrl + 'basket',
      this.basket
    )
  }

  async getUserBasket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.subscription = this.getUserBasketObs().subscribe((Basket: Basket) => {
        if (Basket.basketId == null) {
          this.createNewBasketForNewUser(Basket);
          this.updateUserBasketIdObs(this.basket.basketId).subscribe({
            complete: () => {
              this.subscription?.unsubscribe();
              resolve();
            },
            error: (error) => {
              this.subscription?.unsubscribe();
              reject(error);
            }
          });
        } else {
          this.basket = Basket;
          this.subscription?.unsubscribe();
          resolve();
        }
      });
    });
  }

  private getUserBasketObs(): Observable<Basket> {
    return this._HttpClient.get<Basket>(this.baseUrl + `basket`);
  }

  private updateUserBasketIdObs(basketId:string): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseUrl + `basket/userBasket?basketId=` +`${basketId}`,
      null
    );
  }

  private createNewBasketForNewUser(Basket: Basket) {
    this.basket.basketItems = Basket.basketItems;
    this.basket.clientSecret = Basket.clientSecret;
    this.basket.deliveryMethodId = Basket.deliveryMethodId;
    this.basket.paymentIntentId = Basket.paymentIntentId;
    this.basket.shippingPrice = Basket.shippingPrice;
  }


}
