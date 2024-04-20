import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from '../../Shared/Services/order.service';
import { IOrder } from '../../Shared/Models/order';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  orderId!: number;
  order!: IOrder;
  isreadyForShipping! :boolean
  isShipping! :boolean
  isDelivered! :boolean
  isreadyForShippingWidth! :boolean
  isShippingWidth! :boolean
  isDeliveredWidth! :boolean
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined

  constructor(private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _OrderService: OrderService,
    private translate: TranslateService,
    private router: Router) { }
  


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.orderId = Number(params.get('id'));

        this._OrderService.getOrder(this.orderId).subscribe({
          next: (customerOrder) => {
            this.order = customerOrder;

            if(this.order.status == 'Ready For Shipping'){
              this.isreadyForShipping = true;
              this.isreadyForShippingWidth = true;
            }else if(this.order.status == 'Shipping'){
              this.isreadyForShipping = true;
              this.isShipping = true;
              this.isShippingWidth = true;
            }else if(this.order.status == 'Delivered'){
              this.isreadyForShipping = true;
              this.isShipping = true;
              this.isDelivered = true;
              this.isDeliveredWidth = true;
            }
          }
        });

        
      }
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

  cancelOrder(id:number){
    this._OrderService.cancelOrder(id).subscribe({
      next:(response) => {
        this.router.navigate(['/orders']);
      }
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

}

