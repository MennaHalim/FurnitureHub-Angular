import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error)=> {
      if([401].includes(error.status))
      {
        router.navigate(['/login']);
      }
      else if ([403].includes(error.status))
      {
        router.navigate(['/forbidden']);
      }
      else if ([404].includes(error.status))
      {
        console.log("Not found");
      }
      console.error(error.message);

      return throwError(()=> error)
    })
  )
};
