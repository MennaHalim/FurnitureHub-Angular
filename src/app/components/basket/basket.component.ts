import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Shared/Services/basket.service';
import { Basket } from '../../Shared/Models/basket';
import { concatWith } from 'rxjs';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  constructor(private _BasketService: BasketService) { }

  basket: any;

  ngOnInit(): void {
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
}