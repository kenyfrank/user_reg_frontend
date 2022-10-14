import {EventEmitter, Injectable} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserPojo} from '../model/user-pojo.model';
import {UserService} from '../service/user.service';
import {PageManager} from '../util/page-manager';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static user: Subject<any | null> = new BehaviorSubject(undefined);
  private static userId: Subject<any | null> = new BehaviorSubject(undefined);
  public static _user: UserPojo;
  private static initialized: boolean;
  private static newUserToken: EventEmitter<string | null> = new EventEmitter();
  private static expiresIn: EventEmitter<string | null> = new EventEmitter();
  private static ongoingFetch: Observable<any> | null;


  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private router: Router, private pageManager: PageManager) { }

  public getUser() {
    return AuthenticationService.user;
  }

  public login(token: any): Observable<any> {
    const payload = {
      token,
    };
    return this.httpClient.post(`${environment.baseUrl}/token/`, payload)
      .pipe(map((payload: any) => {
        AuthenticationService.initialized = false;
        AuthenticationService.newUserToken.next(payload.token);
        AuthenticationService.expiresIn.next(payload.expiresIn);
        AuthenticationService.userId.next(payload.userId);
        return payload;
      }));
  }

  public newToken() {
    return AuthenticationService.newUserToken;
  }

  public setUserId(userId: string) {
    AuthenticationService.userId.next(userId);
  }

  public setUserToken(token: string) {
    AuthenticationService.newUserToken.next(token);
  }

  public logout() {
    AuthenticationService.newUserToken.next(null);
    AuthenticationService.user.next(null);
    localStorage.removeItem('AppComponent_token');
    localStorage.removeItem('TOKEN');
    this.router.navigate(['login']);
  }

  public fetchUser(): Observable<any> {
    if (AuthenticationService.initialized) {
      return of(AuthenticationService._user);
    }
    return this.fetch();
  }

  private fetch() {
    const wrapper = new AsyncSubject();
    this.userService.getUser()
      .subscribe((u: UserPojo) => {
        const user = u;
        wrapper.next(user);
        wrapper.complete();
        this.pageManager.setCurrentUser(user);
        AuthenticationService.user.next(user);
        localStorage.removeItem('TOKEN');
      }, (err: any) => {
        wrapper.error(err);
        wrapper.complete();
        AuthenticationService.user.next(null);
      });

    return AuthenticationService.ongoingFetch;
  }

  public clearStaleSession() {
    const redirect = AuthenticationService._user;
    AuthenticationService.user.next(null);
    if (redirect) {
      window.location.href = '/login';
    }
  }
}
