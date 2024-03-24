import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient : HttpClient) { }

  baseUrl : string = 'http://localhost:5016/api/products/';

  getSets():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'sets');
  }
}
