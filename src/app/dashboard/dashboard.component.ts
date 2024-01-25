import {Component, OnDestroy} from '@angular/core';
import {ToastsService} from '../shared/components/toasts/toasts.service';
import {AuthService} from '../shared/services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {

  constructor(
    protected authService: AuthService,
    private myToastService: ToastsService,
    private cookieService: CookieService) {
  }

  mYshowFail(): void {
    this.myToastService.show('Fail message', 'my-fail', '../../assets/Union-red.svg');
  }

  mYshowWarning(): void {
    this.myToastService.show('Warning message', 'my-warning', '../../assets/Union-yellow.svg');
  }

  mYshowSuccess(): void {
    this.myToastService.show('Success message', 'my-success', '../../assets/Union-green.svg');
  }

  mYshowCustom(text: string): void {
    this.myToastService.show(text, 'my-info', '../../assets/Union-violet.svg');
  }

  ngOnDestroy(): void {
    if(!this.cookieService.check('login') && !this.cookieService.check('password')){
      this.cookieService.deleteAll();
    }
  }

}
