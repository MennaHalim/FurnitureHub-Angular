import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { BodyComponent } from './components/body/body.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchComponent } from './components/search/search.component';
import { QueryParamGuard } from './Shared/Guards/query-param.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReviewComponent } from './components/review/review.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BasketComponent } from './components/basket/basket.component';




export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent, title: 'Home' },
    { path: 'products/categories', component: BlankLayoutComponent, title: 'Shop', canActivate: [QueryParamGuard] },
    { path: 'products/categories/:type', component: BlankLayoutComponent, pathMatch: 'full' },
    { path: 'products/categories/:type/:productTypeId', component: BlankLayoutComponent, pathMatch: 'full' },
    { path: ':type/details/:id', component: DetailsComponent, title: 'Details' },
    { path: 'basket', component: BasketComponent, title: 'Cart' },
    { path: 'notFound', component: NotFoundComponent, title: 'Not Found' },
    { path: 'login', component: SignInComponent, title: 'sign-in' },
    { path: 'register', component: SignUpComponent, title: 'sign-Up' },
    { path: 'checkout', component: CheckoutComponent, title: 'payment' },
    { path: 'search', component:SearchComponent, title: 'search' },
    { path: 'review', component:ReviewComponent, title: 'reviews' },
    { path: '**', redirectTo: 'notFound' }
];
