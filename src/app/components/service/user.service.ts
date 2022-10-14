import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserDetails(userId: number) {
    return this.httpClient.get(`${environment.baseUrl}/user/details/${userId}`);
  }

  login(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/auth/login`, data)
      .pipe( map(res => res), catchError(err => throwError(err)) );
  }

  getUser() {
    return this.httpClient.get(`${environment.baseUrl}/user/me/`);
  }

  createUser(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/user/create`, data);
  }
}
