import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/Interceptors/error.interceptor';
import { Toast, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/Interceptors/loading.interceptor';
import { jwtInterceptor } from './core/Interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor, jwtInterceptor])),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      countDuplicates: true,
      preventDuplicates: true,
    }))
  ]
};
