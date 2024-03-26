import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BodyComponent } from './Components/body/body.component';
import { QueryParamGuard } from './Shared/Guards/query-param.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent, title: 'Home' },
    { path: 'products/categories', component: BlankLayoutComponent, title: 'Home', canActivate: [QueryParamGuard] },
    { path: 'products/categories/sets', redirectTo: 'products/categories', pathMatch: 'full' },
    { path: 'notFound', component: NotFoundComponent, title: 'Not Found' },
    { path: 'login', component: SignInComponent, title: 'sign-in' },
    { path: 'Register', component: SignUpComponent, title: 'sign-Up' },
    { path: '**', redirectTo: 'notFound' }
];
