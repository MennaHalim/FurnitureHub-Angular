import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent,BodyComponent,FooterComponent]

    // imports: [RouterOutlet, ShoppingOptionsComponent, DisplayallproductsComponent,BodyComponent,HeaderComponent]
})
export class AppComponent {
  title = 'hub_furniture';
}
