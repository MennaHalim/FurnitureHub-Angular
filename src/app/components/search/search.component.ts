import { Component, OnInit, Query } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QueryParamGuard } from '../../Shared/Guards/query-param.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  type: string = 'sets';
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined
  selectedType!: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,) {
     }

  ngOnInit(): void {
    this.lang = this.detectLanguage() || 'en';
    document.documentElement.lang = this.lang;

    this.translate.use(this.lang);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });

    this.selectedType = this.lang == 'en' ? 'sets' : 'طقم'

  }

  private detectLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      localStorage.setItem("lang", 'en');
      lang == 'en';
    }

    return lang;
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

  selectSet() {
    this.type = 'sets'
    if (this.lang == 'en'){
    this.selectedType = 'sets'
    }
    else{
    this.selectedType = 'طقم'
    }
  }

  selectItem() {
    this.type = 'items'
    if (this.lang == 'en'){
      this.selectedType = 'items'
      }
      else{
        this.selectedType = 'قطعة'
      }
  }
}
