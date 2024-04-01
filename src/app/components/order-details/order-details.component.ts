import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from '../../Shared/Services/order.service';
import { IOrder } from '../../Shared/Models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order!: IOrder;
  isreadyForShipping! :boolean
  isShipping! :boolean
  isDelivered! :boolean
  isreadyForShippingWidth! :boolean
  isShippingWidth! :boolean
  isDeliveredWidth! :boolean

  constructor(private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _OrderService: OrderService,
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
  }

  cancelOrder(id:number){
    this._OrderService.cancelOrder(id).subscribe({
      next:(response) => {
        this.router.navigate(['/orders']);
      }
    });
  }


}
