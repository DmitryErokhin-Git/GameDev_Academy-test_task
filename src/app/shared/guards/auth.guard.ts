import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const LoginGuardCanActivate: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  return (cookieService.check('token') && cookieService.check('refreshToken'))
    ? true
    : router.navigate(['/login'], {queryParams: {}});
};
