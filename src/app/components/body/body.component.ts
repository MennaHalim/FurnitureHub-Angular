import { Component, OnDestroy, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserAuthService } from '../../Shared/Services/user-auth.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit, OnDestroy {

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
