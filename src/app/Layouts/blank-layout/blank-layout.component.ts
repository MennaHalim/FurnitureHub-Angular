import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../../components/products/products.component';
import { ShopByComponent } from '../../components/shop-by/shop-by.component';
import { ShoppingOptionsComponent } from '../../components/shopping-options/shopping-options.component';

@Component({
    selector: 'app-blank-layout',
    standalone: true,
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css',
    imports: [ShoppingOptionsComponent, ShopByComponent, ProductsComponent, RouterOutlet]
})
export class BlankLayoutComponent {
   
    
}
