import { Component, OnInit } from '@angular/core';
import {UserPojo} from '../model/user-pojo.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthToken} from '../model/auth-token.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: UserPojo;
  loginForm: FormGroup;
  loading: boolean;
  errMessage: any;
  showErrorMessageTrigger: boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authenticationService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
      if (this.user) {
        this.router.navigate(['/details']);
      } else {
        // this.authenticationService.fetchUser().subscribe(rst => {
        //   if (rst) {
        //     // this.router.navigate(['/details']);
        //   }
        // });
      }
    });
  }

  showErrorMessage(error: any) {
    this.errMessage = error;
    this.showErrorMessageTrigger = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.showErrorMessageTrigger = false;
    }, 20000);
  }


  getErrorMessage() {
    return this.errMessage;
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  public submit(): void {
    console.log('submiting...');
    if (this.loading || this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const value = this.loginForm.value;
    this.userService.login(value).subscribe((it: AuthToken) => {
      this.loading = false;
      this.showErrorMessageTrigger = false;
      this.router.navigate(['/details']);
      localStorage.setItem('TOKEN', it.token);
      this.authenticationService.setUserId(it.userId);
      this.authenticationService.setUserToken(it.token);
    }, error => {
      this.loading = false;
      if (error && error.error && error.error.message) {
        this.showErrorMessage(error.error.message);
      } else {
        this.showErrorMessage(error.message);
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
          console.log('token error 400 ==> ', error);
          this.authenticationService.clearStaleSession();
        }
      } else {
        console.log('token error ==> ', error);
        this.authenticationService.clearStaleSession();
      }
    });
  }
}
