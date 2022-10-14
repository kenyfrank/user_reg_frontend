import { Component } from '@angular/core';
import {UserPojo} from './components/model/user-pojo.model';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthenticationService} from './components/auth/authentication.service';
import {PageManager} from './components/util/page-manager';

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

  constructor(public router: Router, private pageManager: PageManager,
              private authService: AuthenticationService) {
    // this.loadToken();
    console.log('this.currentUser: ', this.pageManager.currentUser);
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = this.pageManager.currentUser;
      }
      console.log('this.user: ', this.user);
      if (!this.user) {
        this.router.navigate(['/login']);
      }
      // else {
      //   this.router.navigate(['/details']);
      // }
    });

    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof RouteConfigLoadStart
    //     || event instanceof NavigationStart) {
    //     this.loading = true;
    //   } else if (event instanceof NavigationEnd
    //     || event instanceof NavigationCancel
    //     || event instanceof NavigationError) {
    //     this.loading = false;
    //     if (router.url === '/') {
    //       this.isLandingPage = true;
    //       this.router.navigate(['login']);
    //     } else {
    //       this.isLandingPage = false;
    //     }
    //   }
    //   if (event instanceof NavigationEnd) {
    //     window.scroll(0, 0);
    //   }
    //   if (event instanceof NavigationError) {
    //     console.log(event);
    //   }
    // });
  }

  loadToken() {
    console.log('load token');
    const savedToken = localStorage.getItem('TOKEN');
    let token = null;
    if (!savedToken) {
      const query = new URLSearchParams(window.location.search);
      token = query.get('token');
    } else {
      token = savedToken;
    }
    if (!token) {
      console.log('no token');
      window.location.href = '/login';
    } else {
      localStorage.setItem('TOKEN', token);
    }
  }
}
