import { ProductService } from './../../Shared/Services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISet } from '../../Shared/Models/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  setDetails!: ISet

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService) { }

  productId!: string | null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')
      }
    })

    this._ProductService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.setDetails = response;
        console.log(this.setDetails);
      }
    });
  }













}
