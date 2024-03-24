import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { concatWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QueryParamGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const categoryId = route.queryParams['categoryId'];

    if (typeof categoryId === 'undefined' || !this.isValidCategoryId(categoryId)) {
      console.log("Here--------------------");
      this.router.navigate(['/notFound']);
      return false;
    }

    return true;
  }

  private isValidCategoryId(categoryId: any): boolean {
    const categoryIdNumber = Number(categoryId);
    return Number.isInteger(categoryIdNumber) && categoryIdNumber > 0;
  }

}