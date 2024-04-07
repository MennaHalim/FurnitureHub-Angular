import { CategoryService } from './../../Services/category.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../Models/category';
import { Subscription, concatWith } from 'rxjs';
import { CapitalizeSpacePipe } from '../../Pipes/capitalize-space.pipe';
import { BasketService } from '../../Services/basket.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../Components/search/search.component';
import { UserAuthService } from '../../Services/user-auth.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, CapitalizeSpacePipe, SearchComponent, CommonModule, TranslateModule]
})
export class HeaderComponent implements OnInit, OnDestroy {

  categorySetsAndItemsTypesData: ICategory[] | null = null;
  private categorySetsAndItemsTypesSubscription: Subscription | undefined;
  langChangeSubscription: Subscription | undefined
  SeachBarDispaly: boolean = false;
  lang: string = 'en';
  isUserLogged: Boolean = false;

  shippingAddress: any;

  constructor(private CategoryService: CategoryService,
    private _BasketService: BasketService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private AuthService: UserAuthService) { }

  basketCount: number = 0;


  ngOnInit(): void {
    this.loadComponentData();

    this.isUserLogged = this.AuthService.UserState;
    this.AuthService.loginSuccessEvent.subscribe((isLoggedIn: boolean) => {
      this.isUserLogged = isLoggedIn;
    });

    if (this.isUserLogged) {
      this._BasketService.getUserBasketObs().subscribe({
        next: (basket) => {
          this.basketCount = basket.basketItems.length;
        }
      });

      this._BasketService.basketItemsCount.subscribe({
        next: (count) => {
          this.basketCount = count;
        }
      })
    } 

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

  private loadComponentData(): void {
    this.categorySetsAndItemsTypesSubscription = this.CategoryService.getAllCategoriesWithTheirSetsAndItemsTypes().subscribe(
      (data) => {
        this.categorySetsAndItemsTypesData = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
    this.AuthService.loginSuccessEvent.unsubscribe();

  }

  private unsubscribeSubscriptions(): void {
    if (this.categorySetsAndItemsTypesSubscription) {
      this.categorySetsAndItemsTypesSubscription.unsubscribe();
    }
  }

  toggleSeachDisplay() {
    this.SeachBarDispaly = !this.SeachBarDispaly;
  }

  toggleLanguage(langCode: string): void {

    this.translate.use(langCode).subscribe(() => {
      localStorage.setItem('lang', langCode);
      this.lang = langCode;
      document.documentElement.lang = langCode;
      this.cdr.detectChanges();
      window.location.reload();
    });
  }

  logout() {
    this.AuthService.logout();
    window.location.reload();
  }

}
