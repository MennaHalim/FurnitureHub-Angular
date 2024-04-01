import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Shared/Services/order.service';
import { IOrder } from '../../Shared/Models/order';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders!: IOrder[];
  constructor(private _OrderService: OrderService) { }

  ngOnInit(): void {
    this._OrderService.getAllOrders().subscribe({
      next: (getAllOrders) => {
        this.orders = getAllOrders;
      }
    })
  }

  padNumber(number: number) {
    return number < 10 ? '0' + number : number;
}

  getDate(order: IOrder) {
    const date = new Date(order.orderDate);
    const year = this.padNumber(date.getFullYear());
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    return `${year} / ${month} / ${day}`;
  }

  getTime(order: IOrder) {
    const date = new Date(order.orderDate);
    let hours = date.getHours();
    const minutes = this.padNumber(date.getMinutes());
    const seconds = this.padNumber(date.getSeconds());
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${meridian}`;
  }

}
