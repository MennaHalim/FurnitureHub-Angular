import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../User/Services/user-auth.service';
import { RegistrationUser } from '../../../User/Models/register/user';
import { CategoryServicesService } from '../../../Category/Services/category-services.service';
import {ICategory} from '../../../Category/Models/icategory'
import { ICategoryWithSetsTypes } from '../../../Category/Models/icategory-with-sets-types';
import { ICategoryWithItemsTypes } from '../../../Category/Models/icategory-with-items-types';
import { ICategoryProducts } from '../../../Category/Models/icategory-products';
import { ProductServicesService } from '../../../Products/Services/product-services.service';
import { ISet } from '../../../Products/Models/iset';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private http: HttpClient,
     private router: Router,
     private AuthService: UserAuthService,
     private catServ : CategoryServicesService,
     private productserv : ProductServicesService) { }

  authTest() {
    this.http.get<any>('http://localhost:5016/WeatherForecast/UserHomePage').subscribe(
      response => {
        this.router.navigate(['/cart']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }
  userTest(){
    this.http.get<any>('http://localhost:5016/WeatherForecast/UserHomePage').subscribe(
      response => {
        this.router.navigate(['/productList']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );

  }
  adminTest(){
    this.http.get<any>('http://localhost:5016/WeatherForecast/AdminHomePage').subscribe(
      response => {
        this.router.navigate(['/productList']); 
      },
      error => {
        console.error('An error occurred:', error);
      }
    );

  }

  logout() {
    // this.AuthService.logout();
    // this.AuthService.register(new RegistrationUser("user3", "user3", "user3@example.com", "string0A*", "string0A*"))
    // .subscribe(response => {
    //   console.log(response);
    // }); 
    this.testgetSetById();
    
  }

  categories? : ICategory;

  testGetAllCategories(){
    this.catServ.getAllCategories().subscribe(data => {
      this.categories = data;

      console.log(this.categories);
    });
  }

  // catwithsetstypes? : ICategoryWithSetsTypes; 

  // testgetCategorySetsType(){
  //   this.catServ.getCategorySetsTypes(1).subscribe(data => {
  //     this.catwithsetstypes = data;

  //     console.log(this.catwithsetstypes.categorySetsTypes[0].name);
  //   });
  // }

  // catwithitemstypes? : ICategoryWithItemsTypes; 

  // testgetCategoryItemsType(){
  //   this.catServ.getCategoryItemsTypes(1).subscribe(data => {
  //     this.catwithitemstypes = data;

  //     console.log(this.catwithitemstypes.categoryItemsTypes[0].name);
  //   });
  // }

  // catproduct?:ICategoryProducts;
  // testgetCategorySets(){
  //   this.productserv.getCategorySets(1, 1).subscribe(data => {
  //     this.catproduct = data;

  //     console.log(this.catproduct);
  //   });
  // }

  set? : ISet
  testgetSetById(){
    this.productserv.getSetById(1).subscribe(data => {
      this.set = data;

      console.log(this.set);
    });
  }

  // catproduct2?:ICategoryProducts;
  // testgetCategoryItems(){
  //   this.productserv.getCategoryItems(1,1).subscribe(data => {
  //     this.catproduct2 = data;

  //     console.log(this.catproduct2);
  //   });
  // }
  
}
