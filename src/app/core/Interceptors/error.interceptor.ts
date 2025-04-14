import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router); // ✅ Inject Router here
  const toast = inject(ToastrService); // ✅ Inject Router here

  return next(req).pipe(
    catchError(
      (err) => {
        if (err) {
          if (err.status === 400) {
            if(err.error.errors){
              throw err.error;
            }
            else{
              toast.error(err.error.message, err.error.statusCode); // Show error message
            }
          }
          if (err.status === 401) {
            toast.error(err.error.message, err.error.statusCode); // Show error message
          }
          if (err.status === 404) {
            router.navigate(['/not-found']); // Navigate to the not-found page
          }
          if (err.status === 500) {
            const navigateExtras: NavigationExtras = {
              state: { error: err.error } // Pass the error to the server-error component
            };
            router.navigate(['/server-error'], navigateExtras); // Navigate to the server-error page
          }
        }
        return throwError(() => err.message || 'Server Error');
      }
    )
  );
}
