import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryItemsTypes, ICategorySetsTypes } from '../Models/category';
import { Observable, tap } from 'rxjs';
import { baseURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ShopByService {

  private getCategorySetsTypesUrl: string = baseURL+'/api/Products/sets/types';
  private getCategoryItemsTypesUrl: string = baseURL+'/api/Products/items/types';

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
