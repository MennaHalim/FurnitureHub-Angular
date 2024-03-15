import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingOptionsComponent } from './Shared/Components/shopping-options/shopping-options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingOptionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hub_furniture';
}
