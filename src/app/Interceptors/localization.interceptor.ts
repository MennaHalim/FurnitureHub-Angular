import { HttpInterceptorFn } from '@angular/common/http';

export const localizationInterceptor: HttpInterceptorFn = (req, next) => {
  const lang = "ar";
  let authReq = req.clone({
      headers: req.headers.set('Accept-Language', lang)
    });

  console.log('lang',authReq);
  
  return next(authReq);
};
