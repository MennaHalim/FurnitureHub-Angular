import { Component, OnInit, ViewChild } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'


@Component({
  selector: 'app-shopping-options',
  standalone: true,
  imports: [MatBadgeModule,
      MatSidenavModule,
      MatListModule, 
      RouterOutlet, 
      MatDividerModule,
      MatIconModule, 
      MatSliderModule, 
      FormsModule, 
      CurrencyPipe, 
      CommonModule, 
      MatToolbarModule,
      MatButtonModule,
      MatSidenav
    ],
  templateUrl: './shopping-options.component.html',
  styleUrl: './shopping-options.component.css'
})
export class ShoppingOptionsComponent implements OnInit  {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  isCategoryExpanded: boolean = false;
  isPriceExpanded: boolean = false;
  isColorExpanded: boolean = false;
  isRooEmxpanded: boolean = false;
  isStyleExpanded: boolean = false;
  minPrice:number = 0;
  maxPrice:number = 20000;
  startValue = this.minPrice;
  endValue = this.maxPrice;
  colors: string[] = ['#e6b77a', '#cccccc', '#0042b3', '#000000', '#ffffff', '#db1818', '#2a6273', '#7d687a', ''];
  private readonly destroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 800px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCategories() {
    this.isCategoryExpanded = !this.isCategoryExpanded;
  }

  togglePrice() {
    this.isPriceExpanded = !this.isPriceExpanded;
  }

  toggleColor() {
    this.isColorExpanded = !this.isColorExpanded;
  }

  toggleRoom() {
    this.isRooEmxpanded = !this.isRooEmxpanded;
  }

  toggleStyle() {
    this.isStyleExpanded = !this.isStyleExpanded;
  }  

}
