import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
     let errorMsg = "";
     if (error.error instanceof ErrorEvent) {
      console.log("this is client side error");
      errorMsg = `Client Error: ${error.error.message}`;
     } else {
      console.log("this is server side error");
      errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
     }
  
     console.log(errorMsg);
     return throwError(() => errorMsg);
    }),
   );
};
