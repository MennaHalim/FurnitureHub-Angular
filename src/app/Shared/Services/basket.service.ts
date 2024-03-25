import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, IBasket } from '../Models/basket';
import { IProduct } from '../Models/product';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = 'http://localhost:5016/api/';
  myToken: any = {
    token: JSON.stringify(localStorage.getItem('etoken'))
  }

  basket: Basket = new Basket();

  addToCart(basket: IBasket): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseUrl + 'basket',
      this.basket
    )
  }

}
