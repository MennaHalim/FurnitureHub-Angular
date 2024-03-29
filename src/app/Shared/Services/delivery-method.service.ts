import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeliverMethod } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodService {

  baseUrl: string = "http://localhost:5016/api/orders";

  constructor(private httpClient: HttpClient) { }

  getDeliveryMethods(): Observable<IDeliverMethod[]> {
    return this.httpClient.get<IDeliverMethod[]>(this.baseUrl + `/deliveryMethods`);
  }

}
