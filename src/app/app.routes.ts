import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BodyComponent } from './Components/body/body.component';
import { QueryParamGuard } from './Shared/Guards/query-param.guard';
import { DetailsComponent } from './Components/details/details.component';
import { BasketComponent } from './Components/basket/basket.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { SearchComponent } from './Components/search/search.component';
import { FailOrderComponent } from './Components/fail-order/fail-order.component';
import { SuccessOrderComponent } from './Components/success-order/success-order.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';




export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent, title: 'Home' },
    { path: 'products/categories', component: BlankLayoutComponent, title: 'Shop', canActivate: [QueryParamGuard] },
    { path: 'products/categories/:type', component: BlankLayoutComponent, pathMatch: 'full' },
    { path: 'products/categories/:type/:productTypeId', component: BlankLayoutComponent, pathMatch: 'full' },
    { path: 'order/details/:id', component: OrderDetailsComponent, title: 'Order' },
    { path: ':type/details/:id', component: DetailsComponent, title: 'Details' },
    { path: 'basket', component: BasketComponent, title: 'Cart' },
    { path: 'notFound', component: NotFoundComponent, title: 'Not Found' },
    { path: 'login', component: SignInComponent, title: 'sign-in' },
    { path: 'register', component: SignUpComponent, title: 'sign-Up' },
    { path: 'checkout/:id', component: CheckoutComponent, title: 'Secure Checkout' },
    { path: 'successOrder/:basketId/:orderId', component: SuccessOrderComponent, title: 'Congratulations' },
    { path: 'failOrder', component: FailOrderComponent, title: 'Fail' },
    { path: 'orders', component: OrdersComponent, title: 'Orders' },
    { path: 'search', component:SearchComponent, title: 'search' },
    //{ path: '**', redirectTo: 'notFound' }
];
