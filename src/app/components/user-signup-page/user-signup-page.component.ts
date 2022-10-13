import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AuthenticationService} from '../auth/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PatternValidator} from '../validator/pattern-validator';

@Component({
  selector: 'app-user-signup-page',
  templateUrl: './user-signup-page.component.html',
  styleUrls: ['./user-signup-page.component.css']
})
export class UserSignupPageComponent implements OnInit {
  signUpForm: FormGroup;
  loading: boolean;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.compose([
        Validators.required,
        PatternValidator.patternValidator(/^.{6,}$/, {hasMinLength: true}),
        PatternValidator.patternValidator(/[0-9]/, {hasNumber: true}),
        PatternValidator.patternValidator(/[a-z]/, {hasLowerCase: true}),
        PatternValidator.patternValidator(/[A-Z]/, {hasUpperCase: true}),
        PatternValidator.patternValidator(/[!@#$%^&*()_+=\[\-\/.<>?:'"{},|\]]/, {hasSpecialCharacters: true})
      ])],
      confirmPassword: ['', Validators.compose([Validators.required, this.passwordsMatch()])]
    });
  }

  public submit(): void {
    // console.log('submit');
    if (this.loading || this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    const value = this.signUpForm.value;
    console.log('value: ', value);
    this.userService.createUser(value).subscribe(it => {
      this.router.navigate(['/details']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  protected passwordsMatch() {
    const self = this;
    return (control: AbstractControl) => {
      if (!self.signUpForm) {
        return null;
      }

      const password = this.signUpForm.get('password').value;
      if (!password) {
        return null;
      }
      return control.value !== password ? { match: true } : null;
    };
  }
}
