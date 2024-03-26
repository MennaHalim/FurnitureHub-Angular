import { Component } from '@angular/core';
import { ShoppingOptionsComponent } from "../../Components/shopping-options/shopping-options.component";
import { ShopByComponent } from "../../Components/shop-by/shop-by.component";
import { ProductsComponent } from "../../Components/products/products.component";

@Component({
    selector: 'app-blank-layout',
    standalone: true,
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css',
    imports: [ShoppingOptionsComponent, ShopByComponent, ProductsComponent]
})
export class BlankLayoutComponent {
}
