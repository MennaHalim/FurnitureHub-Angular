import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ICategory } from '../Models/icategory';
import { ICategoryWithSetsTypes } from '../Models/icategory-with-sets-types';
import { ICategoryWithItemsTypes } from '../Models/icategory-with-items-types';

@Injectable({
  providedIn: 'root'
})
export class CategoryServicesService {
  private categoriesUrl : string = 'http://localhost:5016/api/products/categories';
  private setsUrl : string = 'http://localhost:5016/api/products/sets';
  private itemsUrl : string = 'http://localhost:5016/api/products/items';


  constructor(private httpClient:HttpClient) { }

  getAllCategories() : Observable<ICategory[]>
  {
    return this.httpClient.get<any>(`${this.categoriesUrl}/categories`) 
    .pipe( 
      tap((data) => console.log('All', JSON.stringify(data))) 
    );
  }

  getCategorySetsTypes(categoryId:number): Observable<ICategoryWithSetsTypes[]>{
    return this.httpClient.get<any>(`${this.setsUrl}/types?CategoryId=${categoryId}`) 
    .pipe( 
      tap((data) => console.log('All', JSON.stringify(data))) 
    );
  }

  getCategoryItemsTypes(categoryId:number): Observable<ICategoryWithItemsTypes[]>{
    return this.httpClient.get<any>(`${this.itemsUrl}/types?CategoryId=${categoryId}`) 
    .pipe( 
      tap((data) => console.log('All', JSON.stringify(data))) 
    );
  }

}
