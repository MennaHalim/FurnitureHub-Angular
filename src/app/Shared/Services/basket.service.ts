import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Basket, IBasket } from '../Models/basket';
import { IStripe } from '../Models/order';
import { baseURL } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basketItemsCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) { }
  subscription: Subscription | undefined;
  baseUrl: string = baseURL+'/api/';
  domain: string = 'https://furniture-hub-angular-2.vercel.app/';
  myToken: any = {
    token: JSON.stringify(localStorage.getItem('etoken'))
  }

  basket: Basket = new Basket();
  

  addToOrUpdateCart(basket: IBasket | null): Observable<Basket> {
    return this._HttpClient.post<Basket>(
      this.baseUrl + 'basket',
      basket
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

  getUserBasketObs(): Observable<Basket> {
    return this._HttpClient.get<Basket>(this.baseUrl + `basket`);
  }

  private updateUserBasketIdObs(basketId: string | null): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseUrl + `basket/userBasket?basketId=` + `${basketId}`,
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

  createCheckOutSession(basketId: string | undefined, shippingAddress: object): Observable<IStripe> {
    return this._HttpClient.post<IStripe>(
      this.baseUrl + `payments` + `?basketId=${basketId}` + `&url=${this.domain}`,
      shippingAddress
    )
  }

  payOrder(orderId: number | null):Observable<any>{
    return this._HttpClient.post<IStripe>(
      this.baseUrl + `orders/` + `${orderId}`,
      null
    )
  }


  deleteBasketAfterPayment(basketId: string | null): Observable<any> {
    return this._HttpClient.delete(
      this.baseUrl + `basket` + `?id=${basketId}`
    )
  }











}
