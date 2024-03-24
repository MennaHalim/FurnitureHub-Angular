import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { ForbiddenComponent } from './Components/forbidden/forbidden.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';


export const routes: Routes = [
    { path: 'forbidden', component: ForbiddenComponent, title: 'Forbidden' },
    { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
