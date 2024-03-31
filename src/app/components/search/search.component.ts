import { Component, OnInit, Query } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QueryParamGuard } from '../../Shared/Guards/query-param.guard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  type: string = 'sets';
  constructor(private route: ActivatedRoute, private router: Router) { }


  private getDataFromUrl() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      console.log(params['type']);
      if (!this.type) {
        this.type = 'sets';
      }
    });
  }


  onSearch(event: Event) {
    this.getDataFromUrl();
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const queryInput = form.elements.namedItem('query') as HTMLInputElement; 
    const query = queryInput.value;

    const queryParams: { [key: string]: any } = {}; 
    queryParams['search'] = query; 
    
    this.router.navigate(['/products/categories/', this.type], { queryParams });
  }
}
