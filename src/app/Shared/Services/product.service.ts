import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:5016/api/products/';

  getSetsByCategory(categoryId: number): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `sets?categoryId=${categoryId}`);
  }

  getItemsByCategory(categoryId: number): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `items?categoryId=${categoryId}`);
  }

  getProductDetails(productId: string | null, productType: string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `${productType}?${productType}Id=${productId}`);
  }

}
