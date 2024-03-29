import { Component, Input, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core'; 
import {MatBadgeModule} from '@angular/material/badge'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
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
import { Subject, Subscription } from 'rxjs'
import { ICategorySetsTypes, ICategoryItemsTypes, IType } from '../../Shared/Models/category';
import { ShopByService } from '../../Shared/Services/shop-by.service';


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
      RouterModule
    ],
  templateUrl: './shopping-options.component.html',
  styleUrl: './shopping-options.component.css'
})
export class ShoppingOptionsComponent implements OnInit, OnDestroy  {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @Input() minPrice:number = 0;
  @Input()maxPrice:number = 200000;
  colors: string[] = ['Jute', 'gray', 'white', 'brown', 'black', 'blue', 'beige'];

  isCategoryExpanded: boolean = false;
  isPriceExpanded: boolean = false;
  isColorExpanded: boolean = false;
  isRooEmxpanded: boolean = false;
  isStyleExpanded: boolean = false;
  categoryOptionsDisplay : boolean = true;
  ItemsTypesDisplay : boolean = false;
  SetsTypesDisplay : boolean = false;
  goButtonClicked : boolean = false;
  categoryId: number = 0;
  productTypeId : number = 0;
  type: string = 'sets' 
  startValue : number = 0;
  endValue  :number = 0;
  color :string = '';
 


  categoryTypesData: ICategorySetsTypes | null = null;
  categorySetsTypesData: IType[] = []
  categoryItemsTypesData: IType[] = []
  private categorySetsTypesSubscription: Subscription | undefined;
  private categoryItemsTypesSubscription: Subscription | undefined;

  private readonly destroy$ = new Subject<void>();


  constructor(private breakpointObserver: BreakpointObserver,
     private changeDetectorRef: ChangeDetectorRef,
     private route: ActivatedRoute,
     private shopByService: ShopByService, 
     private router: Router) {}

  ngOnInit(): void {
    this.getDataFromUrl();

    if (!Number.isNaN(this.productTypeId)){
      this.categoryOptionsDisplay = false;
      this.selectOption(this.type);
    }

    if(Number.isNaN(this.startValue) || Number.isNaN(this.endValue)){
      this.startValue = this.minPrice;
      this.endValue = this.maxPrice;
    }
  }

  private getDataFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.color = params['color'];
      this.startValue = +params['minPrice'];
      this.endValue = +params['maxPrice'];
      
      if((this.startValue != this.minPrice || this.endValue != this.maxPrice)
      && !Number.isNaN(this.startValue) && !Number.isNaN(this.endValue)){
        this.goButtonClicked = true;
      }
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

    if(option == "sets"){
      this.categorySetsTypesSubscription = this.shopByService.getCategorySetsTypes(this.categoryId).subscribe(
        (data) => {
          this.categorySetsTypesData = data.categorySetsTypes;
        });

        this.SetsTypesDisplay = true;
        this.type = 'sets';
        this.reloadProducts();
    }
    else{
      this.categoryItemsTypesSubscription = this.shopByService.getCategoryItemsTypes(this.categoryId).subscribe(
        (data) => {
          this.categoryItemsTypesData = data.categoryItemsTypes;
        });

        this.ItemsTypesDisplay = true;
        this.type= 'items';
        this.reloadProducts();
    }
  }

  selectType(id: number){
    this.productTypeId = id;
    this.reloadProducts();
  }

  selectColor(color : string){
    this.color = color;
    this.reloadProducts();
  }

  selectPrice(){
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
        queryParams['minPrice'] = this.startValue;
        queryParams['maxPrice'] = this.endValue;
      }
      this.router.navigate(['/products/categories/', this.type], { queryParams });
    } else {
      if (this.color !== '') {
        queryParams['color'] = this.color;
      }
      if (this.goButtonClicked) {
        queryParams['minPrice'] = this.startValue;
        queryParams['maxPrice'] = this.endValue;
      }
      this.router.navigate(['/products/categories/', this.type, this.productTypeId], { queryParams });
    }
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
