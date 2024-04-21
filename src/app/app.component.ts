import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet, Scroll } from '@angular/router';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { BlankLayoutComponent } from "./Layouts/blank-layout/blank-layout.component";
import { BasketComponent } from './components/basket/basket.component';
import { BodyComponent } from './components/body/body.component';
import { DetailsComponent } from './components/details/details.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { Header2Component } from './Shared/Components/header2/header2.component';



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
  movieData: any;

  toggleSearchOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  constructor(private router: Router, private viewportScroller: ViewportScroller,
    changeDetectorRef: ChangeDetectorRef) {
      router.events.subscribe(e => {
          viewportScroller.scrollToPosition([0,0]);
        });
      }

}
