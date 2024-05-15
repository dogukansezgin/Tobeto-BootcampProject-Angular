import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
     let errorMsg = "";
     if (error.error instanceof ErrorEvent) {
      console.log(">>> This is 'Client Side Error'");
      errorMsg = `Client Error: ${error.error.message}`;

     } else {
      console.log(">>> This is 'Server Side Error'");
      console.log(error.error.errors);
      
      let fullError: string = error.error as string
      let startIndex = fullError.indexOf('BusinessException:') + 'BusinessException:'.length;
      let endIndex = fullError.indexOf('at '); // 'at ' ifadesinden öncesini alır
      let errorMessagePart = fullError.substring(startIndex, endIndex).trim();
      
      errorMsg = `Server Error Code: ${error.status}, Message: ${errorMessagePart}`;
     }
  
     console.log(errorMsg);
     return throwError(() => errorMsg);
    }),
   );
};
