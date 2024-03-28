import { ProductService } from './../../Shared/Services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISet } from '../../Shared/Models/product';
import { CapitalizeSpacePipe } from "../../Shared/Pipes/capitalize-space.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [CapitalizeSpacePipe, CommonModule]
})
export class DetailsComponent implements OnInit {

  selectedTab: string = 'size-guide';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }


  productDetails!: ISet | null;

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService) { }

  productId!: string | null;
  productType!: string | null;

  ngOnInit(): void {
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

}