import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingOptionsComponent } from './Shared/Components/shopping-options/shopping-options.component';
import { DisplayallproductsComponent } from "./display_all_products/component/displayallproducts/displayallproducts.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ShoppingOptionsComponent, DisplayallproductsComponent]
})
export class AppComponent {
  title = 'hub_furniture';
}
