import { CustomerReview, ICustomerReview, IProduct } from '../../Shared/Models/product';
import { ProductService } from '../../Shared/Services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomerReviewToCreate, ISet } from '../../Shared/Models/product';
import { CapitalizeSpacePipe } from "../../Shared/Pipes/capitalize-space.pipe";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { IBasketItem } from '../../Shared/Models/basket';
import { BasketService } from '../../Shared/Services/basket.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [CapitalizeSpacePipe, CommonModule, ReactiveFormsModule, TranslateModule]
})
export class DetailsComponent implements OnInit, OnDestroy {

  selectedTab: string = 'size-guide';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }


  productDetails: any;
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _BasketService: BasketService,
    private translate: TranslateService,) { }
  

  productId!: string | null;
  productType!: any;

  ngOnInit(): void {

    const allStar = document.querySelectorAll<HTMLElement>('.rating .star');
    const ratingValue = document.querySelector<HTMLInputElement>('.rating input');

    allStar.forEach((item, idx) => {
      item.addEventListener('click', function () {
        let click = 0;
        if (ratingValue) {
          ratingValue.value = (idx + 1).toString();
        }

        allStar.forEach(i => {
          i.classList.replace('bxs-star', 'bx-star');
          i.classList.remove('active');
        });

        for (let i = 0; i < allStar.length; i++) {
          if (i <= idx) {
            allStar[i].classList.replace('bx-star', 'bxs-star');
            allStar[i].classList.add('active');
          } else {
            allStar[i].style.setProperty('--i', click.toString());
            click++;
          }
        }
      });
    });

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        this.productType = params.get('type');
      }
    })

    this._ProductService.getProductDetails(this.productId, this.productType).subscribe({
      next: (response) => {
        this.productDetails = response;
      }
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

  currentIndex: number = 0; // Keep track of the current slide index

  next() {
    if (this.productDetails && this.productDetails.customerReviews) {
      let slides = document.querySelectorAll('.slide-container');
      slides[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % slides.length;
      slides[this.currentIndex].classList.add('active');
    }
  }

  prev() {
    if (this.productDetails && this.productDetails.customerReviews) {
      let slides = document.querySelectorAll('.slide-container');
      slides[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex - 1 + slides.length) % slides.length;
      slides[this.currentIndex].classList.add('active');
    }
  }




  counter: number = 1;


  incrementCounter() {
    this.counter++;
    this.updateCounterDisplay();
  }

  decrementCounter() {
    if (this.counter - 1 > 0) {
      this.counter--;
      this.updateCounterDisplay();
    }
  }

  updateCounterDisplay() {
    const numElement = document.querySelector('.num');
    if (numElement) {
      numElement.textContent = this.counter.toString().padStart(2, '0');
    }
  }

  isAvailable(): boolean {
    return this.productDetails?.availability === 'InStock';
  }


  reviewForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \s]*$')]),
    rating: new FormControl(0, Validators.required),
    reviewText: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \s]*$')])
  });

  setRatingValue(value: number): void {
    this.reviewForm.get('rating')?.setValue(value);
  }

  submitReview() {
    if (this.reviewForm.valid) {
      let customerReview: CustomerReview = new CustomerReview();

      customerReview.customerName = this.reviewForm.get('name')?.value;
      customerReview.rate = this.reviewForm.get('rating')?.value;
      customerReview.review = this.reviewForm.get('reviewText')?.value;

      if (this.productType == 'set') {
        customerReview.CategorySetId = Number(this.productDetails?.id);
      }
      else if (this.productType == 'item') {
        customerReview.CategoryItemId = Number(this.productDetails?.id);
      }

      this._ProductService.createReview(customerReview).pipe(
        switchMap(() => this._ProductService.getProductDetails(this.productId, this.productType))
      ).subscribe({
        next: (response) => {
          this.productDetails = response;
          this.reviewForm.reset();

          const allStar = document.querySelectorAll<HTMLElement>('.rating .star');
          allStar.forEach(star => {
            star.classList.replace('bxs-star', 'bx-star');
          });
        }
      });

    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  async addProductToCart(product: IProduct): Promise<void> {
    product.type = this.productType;
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


  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

}

