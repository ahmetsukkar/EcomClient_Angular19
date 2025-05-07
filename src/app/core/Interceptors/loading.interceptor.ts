import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService);

  if (req.method === 'POST' && req.url.includes('create-order')) 
    return next(req);  

  if (req.url.includes('check-email-exist')) 
    return next(req)
  

  loaderService.loader()

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loaderService.hidingLoader();
    })
  );
};
