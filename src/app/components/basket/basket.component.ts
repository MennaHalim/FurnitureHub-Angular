import { Component, OnInit } from '@angular/core';
import { Subscription, concatWith } from 'rxjs';
import { Basket, IBasketItem } from '../../Shared/Models/basket';
import { NumberPadPipe } from '../../Shared/Pipes/number-pad.pipe';
import { Router, RouterLink } from '@angular/router';
import { BasketService } from '../../Shared/Services/basket.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NumberPadPipe, RouterLink, TranslateModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined
  constructor(private _BasketService: BasketService,
    private _router: Router,
    private translate: TranslateService) { }

  basket!: Basket | null;
  subscription: Subscription | undefined;

  async ngOnInit() {
    await this._BasketService.getUserBasket();
    this.basket = this._BasketService.basket;
    this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);

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




  removeFromBasket(productId: number) {
    if (this.basket !== null) {
      for (let index = 0; index < this.basket.basketItems.length; index++) {
        if (this.basket.basketItems[index].productId === productId) {
          this.basket.basketItems.splice(index, 1);
          break;
        }
      }
      this._BasketService.addToOrUpdateCart(this.basket).subscribe();
      this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);
      this._router.navigate(['/basket']);
    }
  }

  clearBasket() {
    if (this.basket !== null) {
      this.basket.basketItems = [];
      this._BasketService.addToOrUpdateCart(this.basket).subscribe();
      this._BasketService.basketItemsCount.next(this.basket!.basketItems.length);
      this._router.navigate(['/basket']);
    }
  }





  //-------------------------------------------
  //__________________Counter__________________
  //-------------------------------------------

  counter: number = 1;

  incrementCounter(item: IBasketItem) {
    item.productQuantity++;
    this._BasketService.addToOrUpdateCart(this.basket).subscribe();
  }

  decrementCounter(item: IBasketItem) {
    if (item.productQuantity - 1 > 0) {
      item.productQuantity--;
      this._BasketService.addToOrUpdateCart(this.basket).subscribe();
    }
  }

  //-------------------------------------------
  //___________________________________________
  //-------------------------------------------
}