import { Component, OnInit, Query } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QueryParamGuard } from '../../Shared/Guards/query-param.guard';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
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
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const queryInput = form.elements.namedItem('query') as HTMLInputElement; 
    const query = queryInput.value;

    const queryParams: { [key: string]: any } = {}; 
    queryParams['search'] = query; 
    
    this.router.navigate(['/products/categories/', this.type], { queryParams });
  }

  selectSet(){
    this.type ='sets'
  }

  selectItem(){
    this.type ='items'
  }
}
