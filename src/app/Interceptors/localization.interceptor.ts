import { HttpInterceptorFn } from '@angular/common/http';

export const localizationInterceptor: HttpInterceptorFn = (req, next) => {
  const lang = "ar";
  let authReq = req.clone({
      headers: req.headers.set('Accept-Language', lang)
    });
  
  return next(authReq);
};
