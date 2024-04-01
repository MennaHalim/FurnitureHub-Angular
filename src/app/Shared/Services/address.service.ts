import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInfo } from '../Models/user';
import { Address } from '../Models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url: string = 'http://localhost:5016/api/UserSettings';

  constructor(private httpClient: HttpClient) {}

  GetAllAddresses(): Observable<Address[]> {    
    return this.httpClient.get<Address[]>(this.url +"/GetAllAddresses");
  }

  Editddresse(address : Address) {
    const editUrl = this.url +"/UpdateAddress" ;   
    return this.httpClient.put<any>(editUrl, address);
  }

  Addddresse(address : Address) {
    const editUrl = this.url +"/AddAddress" ;   
    return this.httpClient.post<any>(editUrl, address);
  }
}
