import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPage } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:5016/api/products/';

  getSetsByCategory(categoryId: number, pageIndex:number=1): Observable<IPage> {
    return this._HttpClient.get<IPage>(this.baseUrl + `sets?categoryId=${categoryId}` + `&pageIndex=${pageIndex}`);
  }

  getSetsByCategoryAndSetType(categoryId: number, setTypeId: number, pageIndex:number=1): Observable<IPage> {
    return this._HttpClient.get<IPage>(this.baseUrl + `sets?categoryId=${categoryId}` + `&setTypeId=${setTypeId}` + `&pageIndex=${pageIndex}`);
  }

  getItemsByCategory(categoryId: number, pageIndex:number=1): Observable<IPage> {
    return this._HttpClient.get<IPage>(this.baseUrl + `items?categoryId=${categoryId}` + `&pageIndex=${pageIndex}`);
  }

  getProductDetails(productId: string | null, productType: string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `${productType}?${productType}Id=${productId}`);
  }

}
