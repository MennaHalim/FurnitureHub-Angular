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
import { AccountInformationComponent } from './components/User-settings/account-information/account-information.component';
import { AddressBookComponent } from './components/User-settings/address-book/address-book.component';
import { GDPRComponent } from './components/User-settings/gdpr/gdpr.component';
import { MyAccountComponent } from './components/User-settings/my-account/my-account.component';
import { MyOrdersComponent } from './components/User-settings/my-orders/my-orders.component';
import { MyProductReviewsComponent } from './components/User-settings/my-product-reviews/my-product-reviews.component';
import { MyWishListComponent } from './components/User-settings/my-wish-list/my-wish-list.component';
import { NewsLetterSubscriptionsComponent } from './components/User-settings/news-letter-subscriptions/news-letter-subscriptions.component';




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
    { path: 'info', component:AccountInformationComponent, title: 'User Info' },
    { path: 'address', component:AddressBookComponent, title: 'Address Book' },
    { path: 'gdpr', component:GDPRComponent, title: 'GDmewsLetterPR' },
    { path: 'account', component:MyAccountComponent, title: 'My Account' },
    { path: 'orders', component:MyOrdersComponent, title: 'My Orders' },
    { path: 'myReviews', component:MyProductReviewsComponent, title: 'Reviews' },
    { path: 'wishList', component:MyWishListComponent, title: 'Wish List' },
    { path: 'mewsLetter', component:NewsLetterSubscriptionsComponent, title: 'News Letter Subscription' },
    { path: '**', redirectTo: 'notFound' }
];
