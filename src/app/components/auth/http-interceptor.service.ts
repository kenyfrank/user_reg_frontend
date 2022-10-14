// import {EventEmitter, Injectable} from '@angular/core';
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {AsyncSubject, Observable, Observer} from 'rxjs';
// import * as moment from 'moment';
// import {AuthenticationService} from './authentication.service';
// import {environment} from '../../../environments/environment';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class HttpInterceptorService  implements HttpInterceptor {
//
//   private static TOKEN_NAME = 'TOKEN';
//   private static headers: any = {};
//   private _httpError: EventEmitter<HttpErrorResponse> = new EventEmitter();
//   private _lastSeen!: moment.Moment;
//
//   constructor(private authenticationService: AuthenticationService) {
//
//     authenticationService.newToken().subscribe((token: string) => {
//       if (!token) {
//         localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
//         return;
//       }
//       localStorage.setItem(HttpInterceptorService.TOKEN_NAME, token);
//     });
//     const lastSeen = localStorage.getItem(HttpInterceptorService.name + '.lastSeen');
//     if (lastSeen) {
//       this._lastSeen = moment.unix(parseInt(lastSeen, 10));
//     }
//   }
//
//   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let token = localStorage.getItem(HttpInterceptorService.TOKEN_NAME);
//
//     if (token) {
//       localStorage.setItem(HttpInterceptorService.TOKEN_NAME, token);
//     }
//     if (token && moment().subtract(environment.sessionTimeout, 'minutes').isAfter(this._lastSeen)) {
//       token = null;
//       localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
//       localStorage.removeItem('TOKEN');
//       this.authenticationService.clearStaleSession();
//     }
//
//     this._lastSeen = moment();
//     localStorage.setItem(HttpInterceptorService.name + '.lastSeen', `${this._lastSeen.valueOf() / 1000}`);
//     if (token) {
//       const headers: any = { Authorization: `Bearer ${token}` };
//       Object.keys(HttpInterceptorService.headers).forEach((header) => {
//         if (!HttpInterceptorService.headers[header]) {
//           return;
//         }
//         headers[header] = HttpInterceptorService.headers[header];
//       });
//       req = req.clone({ setHeaders: headers });
//     }
//
//     const handled: Observable<HttpEvent<any>> = next.handle(req);
//     const subject: AsyncSubject<HttpEvent<any>> = new AsyncSubject();
//     handled.subscribe(subject);
//     subject.subscribe(async (event: HttpEvent<any>) => {
//
//       if (event instanceof HttpErrorResponse) {
//         if (event.status === 401) {
//           this.authenticationService.clearStaleSession();
//           return;
//         }
//         this._httpError.emit(event);
//       }
//     }, (err: HttpEvent<any>) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status < 1) {
//           // this.toastr.error('Please check your internet connection', 'Failed to contact server');
//         } else if (err.status === 401) {
//           if (token) {
//             this.authenticationService.clearStaleSession();
//           }
//           return;
//         } else if (err.status === 404) {
//           return;
//         } else if (err.status === 403) {
//           this.authenticationService.clearStaleSession();
//         }
//         this._httpError.emit(err);
//       }
//     });
//     return Observable.create((obs: Observer<HttpEvent<any>>) => {
//       subject.subscribe(obs);
//     });
//   }
// }
