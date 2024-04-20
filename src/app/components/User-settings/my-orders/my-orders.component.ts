import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }
  
}
