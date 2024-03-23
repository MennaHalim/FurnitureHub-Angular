import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICategoryProducts } from '../Models/icategory-products';
import { ProductsTypes } from '../Models/Enum/products-types';
import { SortType } from '../Models/Enum/sort-type';
import { ISet } from '../Models/iset';
import { IItem } from '../Models/iitem';

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
    sort: SortType | null = null,
    search: string | null = null,
    color: string | null = null,
    minimumPrice: number | null = null,
    maximumPrice: number | null = null,
    pageSize: number = 5,
    pageIndex: number = 1): Observable<ICategoryProducts> {
    let url = `${this.baseUrl}${productType}s?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  
    url += (categoryId !== null) ? `&categoryId=${minimumPrice}` : '';
    url += (setTypeId !== null && setTypeId !== undefined && productType === ProductsTypes.Set) ? `&SetTypeId=${setTypeId}` : '';
    url += (itemTypeId !== null && itemTypeId !== undefined) ? `&ItemTypeId=${itemTypeId}` : '';
    url += (sort && sort !== SortType.NameAsc) ? `&sort=${sort}` : '';
    url += (search) ? `&Search=${search}` : '';
    url += (color) ? `&ProductColor=${color}` : '';
    url += (minimumPrice !== null) ? `&minimumPrice=${minimumPrice}` : '';
    url += (maximumPrice !== null) ? `&maximumPrice=${maximumPrice}` : '';
  
    return this.httpClient.get<ICategoryProducts>(url).pipe(
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
