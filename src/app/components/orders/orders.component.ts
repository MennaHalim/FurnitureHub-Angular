import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Shared/Services/order.service';
import { IOrder } from '../../Shared/Models/order';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders!: IOrder[];
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined
  isAlertDisplayed: boolean = true;

  constructor(private _OrderService: OrderService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._OrderService.getAllOrders().subscribe({
      next: (getAllOrders) => {
        this.orders = getAllOrders;
        this.showAlert();
        console.log(this.isAlertDisplayed)
      }
    })
    this.lang = this.detectLanguage() || 'en';
    document.documentElement.lang = this.lang;

    this.translate.use(this.lang);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });


  }

  showAlert() {
    if (this.orders != null) {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status !== 'Pending' && this.orders[i].status !== 'Cancelled'){
          this.isAlertDisplayed = false;
          break
        }
      }
    }
  }

  private detectLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      localStorage.setItem("lang", 'en');
      lang == 'en';
    }

    return lang;
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
