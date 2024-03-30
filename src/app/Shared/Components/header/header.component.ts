import { CategoryService } from './../../Services/category.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../Models/category';
import { Subscription, concatWith } from 'rxjs';
import { CapitalizeSpacePipe } from '../../Pipes/capitalize-space.pipe';
import { BasketService } from '../../Services/basket.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../components/search/search.component';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterLink, CapitalizeSpacePipe, SearchComponent, CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {

  categorySetsAndItemsTypesData: ICategory[] | null = null;
  private categorySetsAndItemsTypesSubscription: Subscription | undefined;
  SeachBarDispaly: boolean = false;
  lang: string = 'en';

  constructor(private CategoryService: CategoryService,
    private _BasketService: BasketService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef) { }

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
    document.documentElement.lang = this.lang;
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

  toggleSeachDisplay(){
    this.SeachBarDispaly = !this.SeachBarDispaly;
  }

  toggleLanguage(langCode: string): void {

    this.translate.use(langCode).subscribe(() => {
        localStorage.setItem('lang', langCode);
        this.lang = langCode;
        document.documentElement.lang = langCode;
        this.cdr.detectChanges();
        window.location.reload();
    });
}


}
