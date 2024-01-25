import {Injectable} from '@angular/core';
import {ApiService} from '../api/api';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ToastsService} from '../components/toasts/toasts.service';
import {AuthResponse} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;

  constructor(private apiService: ApiService,
              private myToastService: ToastsService,
              private router: Router,
              private cookieService: CookieService) {
    if (this.cookieService.check('login') && this.cookieService.check('password')) {
      this.signIn(
        JSON.parse(this.cookieService.get('login').trim()),
        JSON.parse(this.cookieService.get('password')).trim(),
      );
    } else {
      this.router.navigate(['/login'], {queryParams: {}});
    }
  }

  setCurrentUser(obj: any): void {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          this.currentUser = {...this.currentUser, ...value};
        }
      }
    }
  }

  setCookies(obj: any): void {
    for (const key in obj) {
      if (key === 'tokens') {
        this.setCookies(obj[key]);
      }
      if (key === 'token' || key === 'refreshToken') {
        this.cookieService.set(key, obj[key].toString());
      }
    }
  }

  signIn(login: string, password: string) {
    this.apiService.apiLogin(login, password)
      .pipe(
        tap((response: AuthResponse) => {
          if (response) {
            // this.myToastService.show('Данный пользователя получены', 'my-success', '../../assets/Union-red.svg');
            this.setCookies(response);
            this.setCurrentUser(response);
            this.router.navigate(['/dashboard'], {queryParams: {}});
          }
        }),
        catchError((error: any) => {
          this.cookieService.deleteAll();
          this.router.navigate(['/login'], {queryParams: {}});
          if (error?.error) {
            const errorMessage = error.error.errors || error.error.Message;
            this.myToastService.show(errorMessage, 'my-fail', '../../assets/Union-red.svg');
            throw errorMessage;
          }
          throw error.message;
        }),
        finalize(() => {
        }),
      ).subscribe();
  }

  signOut() {
    this.router.navigate(['/login'], {queryParams: {}});
    this.cookieService.deleteAll();
  }

}
