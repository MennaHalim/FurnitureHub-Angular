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
import { AccountInformationComponent } from './Components/User-settings/account-information/account-information.component';
import { AddressBookComponent } from './Components/User-settings/address-book/address-book.component';
import { GDPRComponent } from './Components/User-settings/gdpr/gdpr.component';
import { MyAccountComponent } from './Components/User-settings/my-account/my-account.component';
import { MyOrdersComponent } from './Components/User-settings/my-orders/my-orders.component';
import { MyProductReviewsComponent } from './Components/User-settings/my-product-reviews/my-product-reviews.component';
import { MyWishListComponent } from './Components/User-settings/my-wish-list/my-wish-list.component';
import { NewsLetterSubscriptionsComponent } from './Components/User-settings/news-letter-subscriptions/news-letter-subscriptions.component';

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
    { path: 'search', component: SearchComponent, title: 'search' },
    { path: '**', redirectTo: 'notFound' },
    { path: 'info', component: AccountInformationComponent, title: 'User Info' },
    { path: 'address', component: AddressBookComponent, title: 'Address Book' },
    { path: 'gdpr', component: GDPRComponent, title: 'GDmewsLetterPR' },
    { path: 'account', component: MyAccountComponent, title: 'My Account' },
    { path: 'orders', component: MyOrdersComponent, title: 'My Orders' },
    { path: 'myReviews', component: MyProductReviewsComponent, title: 'Reviews' },
    { path: 'wishList', component: MyWishListComponent, title: 'Wish List' },
    { path: 'mewsLetter', component: NewsLetterSubscriptionsComponent, title: 'News Letter Subscription' },
];
