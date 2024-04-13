import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../Models/order';
import { baseURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private url: string = baseURL+'/api/orders';

  constructor(private _HttpClient: HttpClient) { }


  getAllOrders(): Observable<IOrder[]> {
    return this._HttpClient.get<IOrder[]>(`${this.url}`)
  }

  getOrder(id: number): Observable<IOrder> {
    return this._HttpClient.get<IOrder>(`${this.url}` + `/${id}`)
  }

  cancelOrder(id: number): Observable<any> {
    return this._HttpClient.post<any>(`${this.url}` + `/cancel` + `/${id}`,
    null)
  }

}
