import { ProductService } from './../../Shared/Services/product.service';
import { Subscription } from 'rxjs';
import { ICategoryItemsTypes, ICategorySetsTypes } from '../../Shared/Models/category';
import { ShopByService } from './../../Shared/Services/shop-by.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-by',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './shop-by.component.html',
  styleUrl: './shop-by.component.css'
})
export class ShopByComponent implements OnInit, OnDestroy {

  categoryId: number = 0;

  categorySetsTypesData: ICategorySetsTypes | null = null;
  categoryItemsTypesData: ICategoryItemsTypes | null = null;
  private categorySetsTypesSubscription: Subscription | undefined;
  private categoryItemsTypesSubscription: Subscription | undefined;
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined
  selectedTab: string = 'shopBySet';
  scrollLeftActive: boolean = false;
  scrollRightActive: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private shopByService: ShopByService,
    private ProductService: ProductService,
    private translate: TranslateService,) { }

  ngOnInit(): void {
    this.getCategoryIdFromUrl();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadComponentData();
      };
    });
    this.lang = this.detectLanguage() || 'en';
    document.documentElement.lang = this.lang;

    this.translate.use(this.lang);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });

  }

  private detectLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      localStorage.setItem("lang", 'en');
      lang == 'en';
    }

    return lang;
  }
  

  private getCategoryIdFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      if (Number.isNaN(this.categoryId)){
        this.categoryId = 1;
      }

      this.loadComponentData();
    })
  }

  private loadComponentData(): void {
    this.categorySetsTypesSubscription = this.shopByService.getCategorySetsTypes(this.categoryId).subscribe(
      (data) => {
        this.categorySetsTypesData = data;
      });

    this.categoryItemsTypesSubscription = this.shopByService.getCategoryItemsTypes(this.categoryId).subscribe(
      (data) => {
        this.categoryItemsTypesData = data;
      });
  }


  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }

  private unsubscribeSubscriptions(): void {
    if (this.categorySetsTypesSubscription) {
      this.categorySetsTypesSubscription.unsubscribe();
    }
    if (this.categoryItemsTypesSubscription) {
      this.categoryItemsTypesSubscription.unsubscribe();
    }
  }

  onTabClick(tab: HTMLElement): void {
    const tabs = document.querySelectorAll(".scrollable-tabs-container a") as NodeListOf<HTMLElement>;
    tabs.forEach((t: HTMLElement) => t.classList.remove('active'));
    tab.classList.add('active');
  }

  onScroll(direction: 'left' | 'right'): void {
    const tabsList = document.querySelector(".scrollable-tabs-container ul") as HTMLElement;;
    const tabsListWidth = tabsList ? tabsList.clientWidth : 0;
    const scrollAmount = direction === 'left' ? -400 : 400;
    if (tabsList) {
      tabsList.scrollLeft += scrollAmount;
      this.manageIcons(tabsList, tabsListWidth);
    }
  }

  manageIcons(tabsList: HTMLElement, tabsListWidth: number): void {
    const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow");
    const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow");
    const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");
    const maxScrollValue = tabsList.scrollWidth - tabsListWidth - 20;

    if (leftArrowContainer && rightArrowContainer && leftArrow) {
      if (tabsList.scrollLeft >= 20) {
        leftArrowContainer.classList.add('active');
      } else {
        leftArrowContainer.classList.remove('active');
      }

      if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove('active');
      } else {
        rightArrowContainer.classList.add('active');
      }
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }


}
