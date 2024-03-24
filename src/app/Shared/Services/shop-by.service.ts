import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryItemsTypes, ICategorySetsTypes } from '../Models/category';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopByService {

  private getCategorySetsTypesUrl: string = 'http://localhost:5016/api/Products/sets/types';
  private getCategoryItemsTypesUrl: string = 'http://localhost:5016/api/Products/items/types';

  constructor(private httpClient: HttpClient) { }

  getCategorySetsTypes(categoryId:number): Observable<ICategorySetsTypes>{
    const url = `${this.getCategorySetsTypesUrl}?CategoryId=${categoryId}`
    return this.httpClient.get<any>(url);
  }

  getCategoryItemsTypes(categoryId:number): Observable<ICategoryItemsTypes>{
    const url = `${this.getCategoryItemsTypesUrl}?CategoryId=${categoryId}`
    return this.httpClient.get<any>(url);
  }

}
