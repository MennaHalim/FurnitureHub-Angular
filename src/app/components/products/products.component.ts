import { ProductService } from './../../Shared/Services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPage } from '../../Shared/Models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  categoryId: number = 0;
  categorySets: IPage | null = null;
  private categorySetsSubscription: Subscription | undefined;


  constructor(private route: ActivatedRoute, private router: Router, private ProductService: ProductService) { }

  ngOnInit(): void {
    this.getCategoryIdFromUrl();

    this.getCategoryIdFromUrl();
    this.loadComponentData();
  }


  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }

  private getCategoryIdFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.loadComponentData();
    })
  }

  private loadComponentData(): void {
    this.categorySetsSubscription = this.ProductService.getSetsByCategory(this.categoryId).subscribe(
      (data) => {
        this.categorySets = data;
      });
  }

  private unsubscribeSubscriptions(): void {
    if (this.categorySetsSubscription) {
      this.categorySetsSubscription.unsubscribe();
    }
  }

}
