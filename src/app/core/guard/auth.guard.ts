import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map(auth => {
      if (auth) {
        return true;
      } else {
        router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
  )

};
