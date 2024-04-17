import { ProductService } from './../../Shared/Services/product.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IPage, IProduct } from '../../Shared/Models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BasketService } from '../../Shared/Services/basket.service';
import { IBasketItem } from '../../Shared/Models/basket';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsTypes } from '../../Shared/Enums/products-types';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  categoryId: number = 0;
  productTypeId: number = 0;
  total: number = 0;
  type: string = 'sets';
  page: IPage | null = null;
  pageSize: number = 0;
  pageIndex: number = 1;
  color: string = '';
  searchValue :string ='';
  startPrice: number = 0;
  endPrice: number = 0 ;
  private categorySetsSubscription: Subscription | undefined;
  private categoryItemsSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;
  @Output() priceRangeChange: EventEmitter<{ minPrice: number, maxPrice: number }> = new EventEmitter();
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined


  constructor(private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private _BasketService: BasketService,
    private _UserAuthService: UserAuthService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.applyPagination(1);
    // ////////////////////
    // this._UserAuthService.login('mostafa.ahmed@gmail.com', 'mostafaAhmed123#').subscribe()
    // ////////////////////
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

  applyPagination(pageNum:number){
    this.getCategoryIdFromUrl(pageNum);
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getCategoryIdFromUrl(pageNum);
      }
    });
  }


  private getCategoryIdFromUrl(pageNum : number) {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.color = params['color'];
      this.startPrice = +params['minPrice'];
      this.endPrice = +params['maxPrice'];
      this.searchValue= params['search'];
    })
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.productTypeId = +params['productTypeId'];
      if (!this.type) {
        this.type = 'sets';
      }
    });
    this.loadComponentData(pageNum);
  }

  private loadComponentData(pageNum : number): void {
 

    if(this.searchValue != undefined){
      this.categoryItemsSubscription = this.ProductService.SearchInProducts(this.type, this.searchValue).subscribe(
        (data) => {
          this.page = data;
          this.pageSize = data.pageSize;
          this.pageIndex = data.pageIndex;
          this.total = data.count;
          this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);
        });
    }
    else if(!Number.isNaN(this.startPrice) || !Number.isNaN(this.endPrice)|| this.color != undefined){
      if (this.type==='sets')
      this.categoryItemsSubscription = this.ProductService.FilterProducts(ProductsTypes.Set,this.categoryId,this.productTypeId,
        NaN,this.color,this.startPrice, this.endPrice).subscribe( (data) => {
          this.page = data;
          this.pageSize = data.pageSize;
          this.pageIndex = data.pageIndex;
          this.total = data.count;
          this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);

        });
      else{
        this.categoryItemsSubscription = this.ProductService.FilterProducts(ProductsTypes.Item,this.categoryId,NaN,
          this.productTypeId,this.color,this.startPrice, this.endPrice).subscribe( (data) => {
            this.page = data;
            this.pageSize = data.pageSize;
            this.pageIndex = data.pageIndex;
            this.total = data.count;
            this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);

          });
      }

    }
    else if (this.type === 'sets' && Number.isNaN(this.productTypeId)) {
      this.categorySetsSubscription = this.ProductService.getSetsByCategory(this.categoryId, pageNum).subscribe(
        (data) => {
          this.page = data;
          this.pageSize = data.pageSize;
          this.pageIndex = data.pageIndex;
          this.total = 10;
          this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);


        });
    }
    else if (this.type === 'items' && Number.isNaN(this.productTypeId)) {
      this.categoryItemsSubscription = this.ProductService.getItemsByCategory(this.categoryId, pageNum).subscribe(
        (data) => {
          this.page = data;
          this.pageSize = data.pageSize;
          this.pageIndex = data.pageIndex;
          this.total = data.count;
          this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);

        });
    }
    else if (this.type === 'sets') {
      this.categorySetsSubscription = this.ProductService.getSetsByCategoryAndSetType(this.categoryId, this.productTypeId , pageNum).subscribe(
        (data) => {
          this.page = data;
          this.pageSize = data.pageSize;
          this.pageIndex = data.pageIndex;
          this.total = data.count;
          this.startPrice = data.minimumPrice;
          this.endPrice = data.maximumPrice;
          this.emitPriceRange(this.startPrice, this.endPrice);

        });
    }

  }


  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }


  async addProductToCart(product: IProduct): Promise<void> {
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


  initializeBasketItemForAddingToCart(product: IProduct): IBasketItem {
    let basketItem: IBasketItem = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productDiscount: product.discount,
      productQuantity: 1,
      productPictureUrl: product.productPictures[0],
      category: product.type,
      type: product.type
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

  pageChanged(event: any) {
    this.applyPagination(event);
  }

  emitPriceRange(minPrice: number, maxPrice: number) {
    this.priceRangeChange.emit({ minPrice, maxPrice });
  }

}
