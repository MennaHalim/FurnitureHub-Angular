import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BodyComponent } from './Components/body/body.component';
import { QueryParamGuard } from './Shared/Guards/query-param.guard';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent, title: 'Home' },
    { path: 'products/sets', component: BlankLayoutComponent, title: 'Home', canActivate: [QueryParamGuard] },
    { path: 'notFound', component: NotFoundComponent, title: 'Not Found' },
    { path: '**', redirectTo: 'notFound' }
];
