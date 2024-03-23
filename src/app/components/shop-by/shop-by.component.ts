import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by',
  standalone: true,
  imports: [],
  templateUrl: './shop-by.component.html',
  styleUrl: './shop-by.component.css'
})
export class ShopByComponent implements OnInit {
  ngOnInit(): void {
    const tabs = document.querySelectorAll(".scrollable-tabs-container a");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tab.classList.add("active");
      });
    });
  }



}