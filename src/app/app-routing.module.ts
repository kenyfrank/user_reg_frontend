import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserDetailsPageComponent} from './components/user-details-page/user-details-page.component';
import {UserSignupPageComponent} from './components/user-signup-page/user-signup-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: UserSignupPageComponent},
  {path: 'details', component: UserDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
