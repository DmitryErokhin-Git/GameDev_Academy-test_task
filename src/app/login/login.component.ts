import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {emailPattern, minLengthPassword} from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected readonly minLengthPassword = minLengthPassword;
  show = false;
  loginForm = new FormGroup({
    login: new FormControl(undefined, [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl(undefined, [Validators.required, Validators.minLength(minLengthPassword)]),
    rememberMe: new FormControl(false),
  });

  get login() {
    return this.loginForm.get('login')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')?.value;
  }

  constructor(public authService: AuthService,
              private cookieService: CookieService) {
  }

  signIn() {
    if (this.login && this.password) {
      const login = this.login as string;
      const password = this.password as string;

      this.authService.signIn(login.trim(), password.trim());

      if (this.rememberMe) {
        this.cookieService.set('login', JSON.stringify(this.login));
        this.cookieService.set('password', JSON.stringify(this.password));
      }
    }
  }

  toggleVisibility() {
    this.show = !this.show;
  }

}
