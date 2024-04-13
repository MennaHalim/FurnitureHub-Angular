import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICategory } from '../Models/category';
import { baseURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private getCategoriesUrl: string = baseURL+'/api/products/categories';

  constructor(private httpClient: HttpClient) { }

  getAllCategoriesWithTheirSetsAndItemsTypes(): Observable<ICategory[]> {
    return this.httpClient.get<any>(`${this.getCategoriesUrl}`)
  }
}
