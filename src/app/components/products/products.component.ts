import { ProductService } from './../../Shared/Services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPage, IProduct } from '../../Shared/Models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BasketService } from '../../Shared/Services/basket.service';
import { Basket, IBasket, IBasketItem } from '../../Shared/Models/basket';
import { UserAuthService } from '../../Shared/Services/user-auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  categoryId: number = 0;
  type: string = 'sets';
  page: IPage | null = null;
  private categorySetsSubscription: Subscription | undefined;
  private categoryItemsSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private _BasketService: BasketService,
    private _UserAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.getCategoryIdFromUrl();
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getCategoryIdFromUrl();
      }
    });

    // ////////////////////
    // this._UserAuthService.login('mostafa.ahmed@gmail.com', 'mostafaAhmed123#').subscribe()
    // ////////////////////

  }

  private getCategoryIdFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
    })
    this.route.params.subscribe(params => {
      this.type = params['type'];
      if (!this.type) {
        this.type = 'sets';
      }
    });
    this.loadComponentData();
  }

  private loadComponentData(): void {
    if (this.type === 'sets') {
      this.categorySetsSubscription = this.ProductService.getSetsByCategory(this.categoryId).subscribe(
        (data) => {
          this.page = data;
        });
    }
    else if (this.type === 'items') {
      this.categoryItemsSubscription = this.ProductService.getItemsByCategory(this.categoryId).subscribe(
        (data) => {
          this.page = data;
        });
    }
  }


  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }


  async addProductToCart(product: IProduct): Promise<void> {
    debugger;
    console.log('you clicked..')
    await this._BasketService.getUserBasket();
    this.updateProductCount(product);
    this._BasketService.addToOrUpdateCart(this._BasketService.basket).subscribe({
      next: (basket) => {
        this._BasketService.basketItemsCount.next(basket.basketItems.length);
      }
    });

  }

  private updateProductCount(set: IProduct) {
    let basket = this._BasketService.basket;

    if (basket !== null && basket.basketItems !== null) {
      for (let item of basket.basketItems) {
        if (item.productId == set.id) {
          item.productQuantity += 1;
          return;
        }
      };

      let basketItem: IBasketItem = this.initializeBasketItemForAddingToCart(set)

      basket.basketItems.push(basketItem);
    }
  }


  initializeBasketItemForAddingToCart(set: IProduct): IBasketItem {
    let basketItem: IBasketItem = {
      productId: set.id,
      productName: set.name,
      productPrice: set.price,
      productQuantity: 1,
      productPictureUrl: set.productPictures[0],
      category: set.type,
      type: set.type
    }
    return basketItem;
  }

  private unsubscribeSubscriptions(): void {
    if (this.categorySetsSubscription) {
      this.categorySetsSubscription.unsubscribe();
    }
    if (this.categoryItemsSubscription) {
      this.categoryItemsSubscription.unsubscribe();
    }
  }

}
