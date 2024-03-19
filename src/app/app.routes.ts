import { Routes } from '@angular/router';
import { ShoppingOptionsComponent } from './Products/Components/shopping-options/shopping-options.component';
import { LoginComponent } from './User/Componenets/login/login.component';
import { ForbiddenComponent } from './Shared/Components/forbidden/forbidden.component';
import { CartComponent } from './Cart/cart/cart.component';
import { TestComponent } from './Shared/Components/test/test.component';

export const routes: Routes = [
    {path:'', redirectTo:'test', pathMatch:'full'},
    {path:'productList', component:ShoppingOptionsComponent, title:'Product List'},
    {path:'login', component:LoginComponent, title:'Login'},
    {path:'forbidden', component:ForbiddenComponent, title:'Forbidden'},
    {path:'cart', component:CartComponent, title:'Cart'},
    {path:'test', component:TestComponent, title:'test'}
];
