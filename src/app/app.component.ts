import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HeaderComponent } from './Shared/Components/header/header.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent,RouterOutlet,FooterComponent]

    // imports: [RouterOutlet, ShoppingOptionsComponent, DisplayallproductsComponent,BodyComponent,HeaderComponent]
})
export class AppComponent {
  title = 'hub_furniture';
}
