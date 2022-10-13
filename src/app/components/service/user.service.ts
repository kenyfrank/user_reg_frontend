import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserDetails(userId: number) {
    return this.httpClient.get(`${environment.baseUrl}/user/details/${userId}`);
  }

  getUser() {
    return this.httpClient.get(`${environment.baseUrl}/user/me/`);
  }

  public createUser(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/user/create`, data);
  }
}
