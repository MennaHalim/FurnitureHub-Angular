import { ProductService } from './../../Shared/Services/product.service';
import { ProductsComponent } from './../products/products.component';
import { Subscription } from 'rxjs';
import { ICategoryItemsTypes, ICategorySetsTypes } from '../../Shared/Models/category';
import { ShopByService } from './../../Shared/Services/shop-by.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by',
  standalone: true,
  imports: [],
  templateUrl: './shop-by.component.html',
  styleUrl: './shop-by.component.css'
})
export class ShopByComponent implements OnInit, OnDestroy {

  categorySetsTypesData: ICategorySetsTypes | null = null;
  categoryItemsTypesData: ICategoryItemsTypes | null = null;
  private categorySetsTypesSubscription: Subscription | undefined;
  private categoryItemsTypesSubscription: Subscription | undefined;
  selectedTab: string = 'shopBySet';
  scrollLeftActive: boolean = false;
  scrollRightActive: boolean = true;

  constructor(private shopByService: ShopByService,
    private ProductService : ProductService) { }

  ngOnInit(): void {
    this.categorySetsTypesSubscription = this.shopByService.getCategorySetsTypes().subscribe(
      (data) => {
        this.categorySetsTypesData = data;
      });

    this.ProductService.getSets().subscribe({
      next: (response) => {
        console.log(response);
      }
    })

  }

  ngOnDestroy(): void {
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

    this.categoryItemsTypesSubscription = this.shopByService.getCategoryItemsTypes().subscribe(
      (data) => {
        this.categoryItemsTypesData = data;
      });
  }
}