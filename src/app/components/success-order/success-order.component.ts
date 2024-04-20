import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../../Shared/Services/basket.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success-order',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.css'
})
export class SuccessOrderComponent implements OnInit, OnDestroy {

  lang: string = 'en';
  langChangeSubscription: Subscription | undefined

  constructor(
    private translate: TranslateService,
    private _BasketService: BasketService,
    private _router: ActivatedRoute) { }
  

  shippingAddress: any;
  sessionId: string | null = '';
  basketId: string | null = '';
  orderId: number | null = 0;

  ngOnInit(): void {
    this._BasketService.basketItemsCount.next(0);

    this._router.paramMap.subscribe(params => {
      this.sessionId = params.get('sessionId');
      this.basketId = params.get('basketId');
      this.orderId = Number(params.get('orderId'));
      console.log(this.orderId);
      this._BasketService.payOrder(this.orderId).subscribe();
      this._BasketService.deleteBasketAfterPayment(this.basketId).subscribe();
    })

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

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

}