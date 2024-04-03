import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { loggerInterceptor } from './Interceptors/logger.interceptor';
import { localizationInterceptor } from './Interceptors/localization.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
  provideHttpClient(withInterceptors([loggerInterceptor, errorInterceptor, localizationInterceptor])),
  importProvidersFrom(
    TranslateModule.forRoot({
      defaultLanguage:'en' ,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }, 
    })
  )]
};
