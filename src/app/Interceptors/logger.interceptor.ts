import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const loggerInterceptor = (req: HttpRequest<unknown>, next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token');
  
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  console.log(authReq.body)
  return next(authReq);
};
