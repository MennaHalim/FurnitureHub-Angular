import { Component, Input, OnInit, input } from '@angular/core';
import { ICategoryProducts } from '../../Models/icategory-products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-produts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-produts.component.html',
  styleUrl: './all-produts.component.css'
})
export class AllProdutsComponent {

  @Input() products!: ICategoryProducts;

}
