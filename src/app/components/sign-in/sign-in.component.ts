import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserAuthService } from '../../Shared/Services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,CommonModule, TranslateModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  lang: string = 'en';
  langChangeSubscription: Subscription | undefined;
  rememberMe : boolean = false;
  agree : boolean = false;
  submit : boolean = false;



  constructor(private authService: UserAuthService,
     private router: Router,
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

  onSubmit(form: NgForm) {
    this.submit = true;
    console.log('Form submitted:', form.value);
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe(
        () => {
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Email or password incorrect'; 
          } else {
            this.errorMessage = 'An error occurred. Please try again later.'; 
          }
        }
      );
    }
  }

  navihateToRegister(){
    this.router.navigate(['/register'])
  }
}
