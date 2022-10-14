import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserPojo} from '../model/user-pojo.model';
import {Router} from '@angular/router';
import { Constant } from './constants';


@Injectable({
  providedIn: 'root'
})
export class PageManager {
  public currentUser$: BehaviorSubject<any>;
  private _storeName = '_session-store';
  private store: any;
  private _userScope = 'USER_';
  private _currentUserKey = 'currentUser';

  public user: UserPojo;

  constructor(public router: Router) {
    this.currentUser$ = new BehaviorSubject<any>(this.getCurrentUserFromStorage());
  }

  getCurrentUserFromStorage() {
    return this.getData(this._userScope, this._currentUserKey, Constant.Storage.LOCAL);
  }

  public get currentUser(): UserPojo {
    return this.getData(this._userScope, this._currentUserKey, Constant.Storage.LOCAL);
  }

  public setCurrentUser(user: UserPojo) {
    if (!user) {
      this.currentUser$.next(this.getCurrentUserFromStorage());
    } else {
      this.currentUser$.next(user);
      this.storeData(this._userScope, this._currentUserKey, user, Constant.Storage.LOCAL);
    }
  }

  public getData(scope: string, key: string, storageType: Constant.Storage = Constant.Storage.LOCAL): any | boolean {
    this.store = this.getStore(storageType);
    if (!this.store[scope] || !this.store[scope][key]) {
      return false;
    }
    return JSON.parse(this.store[scope][key]);
  }

  public storeData(scope: string, key: string, data: any, storageType: Constant.Storage = Constant.Storage.LOCAL): boolean {
    this.store = this.getStore(storageType);
    if (!this.store[scope]) {
      this.store[scope] = {};
    }
    this.store[scope][key] = JSON.stringify(data);
    this.persist(storageType);
    return this.store[scope];
  }

  getStore(storageType: Constant.Storage) {
    const sessionStore = this.isLocal(storageType) ? localStorage.getItem(this._storeName) : sessionStorage.getItem(this._storeName);
    return sessionStore ? JSON.parse(sessionStore) : {};
  }


  public clearAllData() {
    localStorage.clear();
    sessionStorage.clear();
  }

  private persist(storageType: Constant.Storage) {
    if (this.isLocal(storageType)) {
      localStorage.setItem(this._storeName, JSON.stringify(this.store));
    } else {
      sessionStorage.setItem(this._storeName, JSON.stringify(this.store));
    }
  }

  isLocal(type: Constant.Storage): boolean {
    return type === Constant.Storage.LOCAL;
  }
}
