import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginGuardCanActivate} from './shared/guards/auth.guard';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Авторизация',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Главная страница',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => LoginGuardCanActivate(route, state)],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Страница не найдена',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
