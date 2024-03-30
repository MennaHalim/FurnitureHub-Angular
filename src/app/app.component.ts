import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { BlankLayoutComponent } from "./Layouts/blank-layout/blank-layout.component";
import { BasketComponent } from './components/basket/basket.component';
import { BodyComponent } from './components/body/body.component';
import { DetailsComponent } from './components/details/details.component';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent,
    RouterOutlet,
    FooterComponent,
    BodyComponent,
    BlankLayoutComponent,
    DetailsComponent,
    BasketComponent]
})
export class AppComponent {
  title = 'hub_furniture';
  isOverlayVisible = false;

  toggleSearchOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }
}
