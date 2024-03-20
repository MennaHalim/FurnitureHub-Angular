import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingOptionsComponent } from './Products/Components/shopping-options/shopping-options.component';
import { DisplayallproductsComponent } from "./Products/Components/displayallproducts/displayallproducts.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BodyComponent } from './body-home/body/body.component';
import { HeaderComponent } from './Shared/Components/Header/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ShoppingOptionsComponent, DisplayallproductsComponent,BodyComponent,HeaderComponent]
})
export class AppComponent {
  title = 'hub_furniture';
}
