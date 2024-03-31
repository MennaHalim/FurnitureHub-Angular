import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Shared/Services/basket.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../Shared/Components/header/header.component';

@Component({
  selector: 'app-success-order',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.css'
})
export class SuccessOrderComponent implements OnInit {

  constructor(private _BasketService: BasketService,
    private _router: ActivatedRoute) { }

  shippingAddress: any;
  sessionId: string | null = '';
  basketId: string | null = '';
  orderId: number | null = 0;

  ngOnInit(): void {

    this._router.paramMap.subscribe(params => {
      this.sessionId = params.get('sessionId');
      this.basketId = params.get('basketId');
      this.orderId = Number(params.get('orderId'));
      console.log(this.orderId);
      this._BasketService.payOrder(this.orderId).subscribe();
      this._BasketService.deleteBasketAfterPayment(this.basketId).subscribe();
    })

  }

}