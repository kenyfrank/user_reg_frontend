import { Component } from '@angular/core';
import {UserPojo} from './components/model/user-pojo.model';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthenticationService} from './components/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User App';
  user: UserPojo;
  isLandingPage = false;
  loading: boolean | undefined;

  constructor(public router: Router,
              private authService: AuthenticationService) {
    this.loadToken();
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
      if (!this.user) {
        this.router.navigate(['login']);
      }
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof RouteConfigLoadStart
        || event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationError) {
        this.loading = false;
        if (router.url === '/') {
          this.isLandingPage = true;
          this.router.navigate(['login']);
        } else {
          this.isLandingPage = false;
        }
      }
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
      if (event instanceof NavigationError) {
        console.log(event);
      }
    });
  }

  loadToken() {
    const savedToken = localStorage.getItem('TOKEN');
    let token = null;
    if (!savedToken) {
      const query = new URLSearchParams(window.location.search);
      token = query.get('token');
    } else {
      token = savedToken;
    }
    if (!token) {
      window.location.href = '/login';
    } else {
      localStorage.setItem('TOKEN', token);
    }
  }
}
