import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPage } from '../Models/product';
import { ProductsTypes } from '../Enums/products-types';

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

  FilterProducts(productType: ProductsTypes,
    categoryId: number | null = null,
    setTypeId: number | null = null,
    itemTypeId: number | null = null,
    color: string | null = null,
    minimumPrice: number | null = null,
    maximumPrice: number | null = null): Observable<IPage> {
    let url = `${this.baseUrl}${productType}s?`;
  
    url += (!Number.isNaN(categoryId)) ? `&categoryId=${categoryId}` : '';
    url += (!Number.isNaN(setTypeId)&& productType === ProductsTypes.Set) ? `&SetTypeId=${setTypeId}` : '';
    url += (!Number.isNaN(itemTypeId) && productType === ProductsTypes.Item) ? `&ItemTypeId=${itemTypeId}` : '';
    url += (color!= undefined) ? `&ProductColor=${color}` : '';
    url += (!Number.isNaN(minimumPrice)) ? `&minimumPrice=${minimumPrice}` : '';
    url += (!Number.isNaN(maximumPrice)) ? `&maximumPrice=${maximumPrice}` : '';
  
    return this._HttpClient.get<IPage>(url);
  }

  SearchInProducts(productType: string, search: string): Observable<IPage> {
    const url = `${this.baseUrl}${productType}${search ? `?Search=${search}` : ''}`;
    
    return this._HttpClient.get<IPage>(url);
  }
  

}
