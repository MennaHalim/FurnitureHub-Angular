import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICategory } from '../Models/icategory';
import { ICategoryWithSetsTypes } from '../Models/icategory-with-sets-types';
import { ICategoryWithItemsTypes } from '../Models/icategory-with-items-types';
import {ProductsTypes} from '../../Products/Models/Enum/products-types'

@Injectable({
  providedIn: 'root'
})
export class CategoryServicesService {
  private categoriesUrl: string = 'http://localhost:5016/api/products/categories';
  private typesBaseUrl: string = 'http://localhost:5016/api/products/';
  
  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<ICategory> {
    return this.httpClient.get<any>(`${this.categoriesUrl}/categories`)
      .pipe(
        tap((data) => console.log('All', JSON.stringify(data)))
      );
  }

  getCategoryTypes(categoryId: number, type: ProductsTypes): Observable<ICategoryWithSetsTypes | ICategoryWithItemsTypes> {
    const url = `${this.typesBaseUrl}${type}s/${categoryId}`;
    return this.httpClient.get<any>(url)
      .pipe(
        tap((data) => console.log('All', JSON.stringify(data)))
      );
  }
}
