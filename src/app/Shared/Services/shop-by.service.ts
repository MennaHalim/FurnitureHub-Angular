import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryItemsTypes, ICategorySetsTypes } from '../Models/category';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopByService {

  private getCategorySetsTypesTestUrl: string = 'http://localhost:5016/api/Products/sets/types?CategoryId=1';
  private getCategoryItemsTypesTestUrl: string = 'http://localhost:5016/api/Products/items/types?CategoryId=1';

  constructor(private httpClient: HttpClient) { }

  getCategorySetsTypes(): Observable<ICategorySetsTypes>{
    return this.httpClient.get<any>(`${this.getCategorySetsTypesTestUrl}`);
  }

  getCategoryItemsTypes(): Observable<ICategoryItemsTypes>{
    return this.httpClient.get<any>(`${this.getCategoryItemsTypesTestUrl}`);
  }

}
