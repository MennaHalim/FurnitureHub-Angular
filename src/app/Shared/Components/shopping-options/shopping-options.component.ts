import { Component } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';





@Component({
  selector: 'app-shopping-options',
  standalone: true,
  imports: [MatBadgeModule, MatSidenavModule, MatListModule, RouterOutlet, MatDividerModule, MatIconModule],
  templateUrl: './shopping-options.component.html',
  styleUrl: './shopping-options.component.css'
})
export class ShoppingOptionsComponent {
  isExpanded: boolean = false;

  toggleCategories() {
    this.isExpanded = !this.isExpanded;
  }

}
