import { CategoryService } from './../../Services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../Models/category';
import { Subscription, concatWith } from 'rxjs';
import { CapitalizeSpacePipe } from '../../Pipes/capitalize-space.pipe';
import { BasketService } from '../../Services/basket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CapitalizeSpacePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  categorySetsAndItemsTypesData: ICategory[] | null = null;
  private categorySetsAndItemsTypesSubscription: Subscription | undefined;


  constructor(private CategoryService: CategoryService,
    private _BasketService: BasketService) { }

  basketCount: number = 0;

  ngOnInit(): void {
    this.loadComponentData();

    this._BasketService.getUserBasketObs().subscribe({
      next: (basket) => {
        this.basketCount = basket.basketItems.length;
      }
    });

    this._BasketService.basketItemsCount.subscribe({
      next: (count) => {
        this.basketCount = count;
      }
    })


  }

  private loadComponentData(): void {
    this.categorySetsAndItemsTypesSubscription = this.CategoryService.getAllCategoriesWithTheirSetsAndItemsTypes().subscribe(
      (data) => {
        this.categorySetsAndItemsTypesData = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }

  private unsubscribeSubscriptions(): void {
    if (this.categorySetsAndItemsTypesSubscription) {
      this.categorySetsAndItemsTypesSubscription.unsubscribe();
    }
  }

}
