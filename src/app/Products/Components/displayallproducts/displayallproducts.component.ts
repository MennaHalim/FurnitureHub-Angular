import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-displayallproducts',
  standalone: true,
  imports: [MatPaginatorModule],
  // schemas: [MatPaginator],
  
  templateUrl: './displayallproducts.component.html',
  styleUrl: './displayallproducts.component.css'
})
export class DisplayallproductsComponent {

  //for checked 
  isChecked: number | null = null;

  markChecked(index: number): void {
    this.isChecked = index;
}
  //End for checked 

   //for pagination
  totalItems = 100; // Example total items
  itemsPerPage = 10;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;

  
  cards = [
    { name: 'Product 1', price: 20, oldPrice: 30, imageUrl: '...', sale: true },
    
  ];

  get pagedCards() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  //end paginaion
}
