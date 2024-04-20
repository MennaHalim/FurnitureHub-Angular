import { Component, Input, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { min, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs'
import { ICategorySetsTypes, ICategoryItemsTypes, IType } from '../../Shared/Models/category';
import { ShopByService } from '../../Shared/Services/shop-by.service';
import { TranslateCompiler, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../Shared/Services/product.service';
import { ProductsTypes } from '../../Shared/Enums/products-types';


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
    MatSidenav,
    RouterModule,
     TranslateModule ],
  templateUrl: './shopping-options.component.html',
  styleUrl: './shopping-options.component.css'
})
export class ShoppingOptionsComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 200000;
  // @Input() startValue: number = this.minPrice;
  // @Input() endValue: number = this.maxPrice;
  startValue: number = this.minPrice;
  endValue: number = this.maxPrice;

  colors: string[] = ['Jute', 'gray', 'white', 'brown', 'black', 'blue', 'beige'];

  isCategoryExpanded: boolean = false;
  isPriceExpanded: boolean = false;
  isColorExpanded: boolean = false;
  isRooEmxpanded: boolean = false;
  isStyleExpanded: boolean = false;
  categoryOptionsDisplay: boolean = true;
  ItemsTypesDisplay: boolean = false;
  SetsTypesDisplay: boolean = false;
  goButtonClicked: boolean = false;
  categoryId: number = 0;
  productTypeId: number = 0;
  color: string = '';
  type: string = 'sets';



  categoryTypesData: ICategorySetsTypes | null = null;
  categorySetsTypesData: IType[] = []
  categoryItemsTypesData: IType[] = []
  private categorySetsTypesSubscription: Subscription | undefined;
  private categoryItemsTypesSubscription: Subscription | undefined;
  private langChangeSubscription: Subscription | undefined
  lang: any = "en";


  private readonly destroy$ = new Subject<void>();


  constructor(private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private shopByService: ShopByService,
    private router: Router,
    private translate: TranslateService,
    private productService: ProductService) {

    this.lang = localStorage.getItem('lang');
    this.translate.use(this.lang);

    this.langChangeSubscription = translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minPrice'] || changes['maxPrice']) {
      this.startValue = this.minPrice; 
      this.endValue = this.maxPrice;
    }

  }


  ngOnInit(): void {
    this.getDataFromUrl();

    if (!Number.isNaN(this.productTypeId)) {
      this.categoryOptionsDisplay = false;
      this.selectOption(this.type);
    }

  }

  private getDataFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.color = params['color'];
      this.startValue = +params['minPrice'];
      this.endValue = +params['maxPrice'];
      // // if ((this.startValue != this.minPrice || this.endValue != this.maxPrice) &&
      //   if(!Number.isNaN(this.startValue) && !Number.isNaN(this.endValue)) {
      //   this.goButtonClicked = true;
      // }
    })
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.productTypeId = +params['productTypeId'];
      if (!this.type) {
        this.type = 'sets';
      }
    });
  }


  selectOption(option: string): void {
    this.categoryOptionsDisplay = false;

    if (option == "sets") {
      this.categorySetsTypesSubscription = this.shopByService.getCategorySetsTypes(this.categoryId).subscribe(
        (data) => {
          this.categorySetsTypesData = data.categorySetsTypes;
        });

      this.SetsTypesDisplay = true;
      this.type = 'sets';
      this.reloadProducts();
    }
    else {
      this.categoryItemsTypesSubscription = this.shopByService.getCategoryItemsTypes(this.categoryId).subscribe(
        (data) => {
          this.categoryItemsTypesData = data.categoryItemsTypes;
        });

      this.ItemsTypesDisplay = true;
      this.type = 'items';
      this.reloadProducts();
    }
  }

  selectType(id: number) {
    this.productTypeId = id;
    this.reloadProducts();
  }

  selectColor(color: string) {
    this.color = color;
    this.reloadProducts();
  }

  selectPrice() {
    this.goButtonClicked = true;
    this.reloadProducts();
  }

  reloadProducts() {

    const queryParams: { [key: string]: any } = { categoryId: this.categoryId };

    if (Number.isNaN(this.productTypeId)) {
      if (this.color !== '') {
        queryParams['color'] = this.color;
      }
      if (this.goButtonClicked) {
        queryParams['minPrice'] = Math.floor(this.startValue);
        queryParams['maxPrice'] = Math.floor(this.endValue);
      }
      this.router.navigate(['/products/categories/', this.type], { queryParams });
    } else {
      if (this.color !== '') {
        queryParams['color'] = this.color;
      }
      if (this.goButtonClicked) {
        queryParams['minPrice'] = Math.floor(this.startValue);
        queryParams['maxPrice'] = Math.floor(this.endValue);
      }

      this.router.navigate(['/products/categories/', this.type, this.productTypeId], { queryParams });
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.categoryItemsTypesSubscription?.unsubscribe;
    this.categorySetsTypesSubscription?.unsubscribe;
    this.langChangeSubscription?.unsubscribe;
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


  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.changeDetectorRef.detectChanges();
  }


}
