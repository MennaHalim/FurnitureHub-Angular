import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fail-order',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './fail-order.component.html',
  styleUrl: './fail-order.component.css'
})
export class FailOrderComponent {
  
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined

  constructor(
     private translate: TranslateService,
    ) {} 

  ngOnInit(): void {
    this.lang = this.detectLanguage() || 'en';
    document.documentElement.lang = this.lang;

    this.translate.use(this.lang);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang;
    });

  }

  private detectLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      localStorage.setItem("lang", 'en');
      lang == 'en';
    }

    return lang;
  }

}
