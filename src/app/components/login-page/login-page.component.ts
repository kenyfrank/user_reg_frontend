import { Component, OnInit } from '@angular/core';
import {UserPojo} from '../model/user-pojo.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: UserPojo;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }


  ngOnInit() {

    this.authenticationService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
      if (this.user) {
        this.router.navigate(['/details']);
      } else {

      }
    });
  }

  private authenticate() {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      window.location.href = 'login';
    }
    this.authenticationService.login(token).subscribe(result => {
      if (result) {
        this.authenticationService.fetchUser();
      }
    }, error => {
      if (error && error.code) {
        if (error.code === 400) {
          console.log('token error 400 ==> ', error)
          this.authenticationService.clearStaleSession();
        }
      } else {
        console.log('token error ==> ', error)
        this.authenticationService.clearStaleSession();
      }
    });
  }
}
