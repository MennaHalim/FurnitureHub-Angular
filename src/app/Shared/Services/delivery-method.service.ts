import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeliverMethod } from '../Models/order';
import { baseURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodService {

  baseUrl: string = baseURL + "/api/orders";

  constructor(private httpClient: HttpClient) { }

  getDeliveryMethods(): Observable<IDeliverMethod[]> {
    return this.httpClient.get<IDeliverMethod[]>(this.baseUrl + `/deliveryMethods`);
  }

}
