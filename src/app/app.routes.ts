import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BodyComponent } from './Components/body/body.component';
import { QueryParamGuard } from './Shared/Guards/query-param.guard';
import { DetailsComponent } from './Components/details/details.component';
import { BasketComponent } from './Components/basket/basket.component';
import { ProductsComponent } from './Components/products/products.component';
import { ShopByComponent } from './Components/shop-by/shop-by.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent, title: 'Home' },
    { path: 'products/categories', component: BlankLayoutComponent, title: 'Shop', canActivate: [QueryParamGuard] },
    { path: 'products/categories/:type', component: BlankLayoutComponent, pathMatch: 'full' },
    { path: 'sets/details/:id', component: DetailsComponent, title: 'Details' },
    { path: 'basket', component: BasketComponent, title: 'Cart' },
    { path: 'notFound', component: NotFoundComponent, title: 'Not Found' },
    { path: '**', redirectTo: 'notFound' }
];
