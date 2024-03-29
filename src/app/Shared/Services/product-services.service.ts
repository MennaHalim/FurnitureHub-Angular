import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductsTypes } from '../Enums/products-types';
import { SortType } from '../Enums/sort-type';
import { IPage, ISet, IItem } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
  private baseUrl: string = 'http://localhost:5016/api/products/';

  constructor(private httpClient: HttpClient) { }

  getCategoryProducts(productType: ProductsTypes,
    categoryId: number | null = null,
    setTypeId: number | null = null,
    itemTypeId: number | null = null,
    color: string | null = null,
    minimumPrice: number | null = null,
    maximumPrice: number | null = null): Observable<IPage> {
    let url = `${this.baseUrl}${productType}s?`;
  
    url += (categoryId !== null) ? `&categoryId=${minimumPrice}` : '';
    url += (setTypeId !== null && setTypeId !== undefined && productType === ProductsTypes.Set) ? `&SetTypeId=${setTypeId}` : '';
    url += (itemTypeId !== null && itemTypeId !== undefined) ? `&ItemTypeId=${itemTypeId}` : '';
    url += (color) ? `&ProductColor=${color}` : '';
    url += (minimumPrice !== null) ? `&minimumPrice=${minimumPrice}` : '';
    url += (maximumPrice !== null) ? `&maximumPrice=${maximumPrice}` : '';
  
    return this.httpClient.get<IPage>(url).pipe(
      tap((data) => console.log(url))
    );
  }

  getSetById(setId: number): Observable<ISet> {
    return this.httpClient.get<any>(`${this.baseUrl}set?setId=${setId}`).pipe(
      tap((data) => console.log('All', JSON.stringify(data)))
    );
  }

  getitemById(itemId: number): Observable<IItem> {
    return this.httpClient.get<any>(`${this.baseUrl}item?ItemId=${itemId}`).pipe(
      tap((data) => console.log('All', JSON.stringify(data)))
    );
  }
}
