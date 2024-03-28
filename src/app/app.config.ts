import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { loggerInterceptor } from './Interceptors/logger.interceptor';
import { localizationInterceptor } from './Interceptors/localization.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
  provideHttpClient(withInterceptors([loggerInterceptor, errorInterceptor, localizationInterceptor]))]
};
