import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const USER = 'user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: BehaviorSubject<any>;
  private sessionState: BehaviorSubject<boolean>;

  public get User(): Observable<any> {
    return this.user.asObservable();
  }

  constructor(private jwtHelper: JwtHelperService) {
    this.sessionState = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<any>(null);
    this.user.asObservable().subscribe(user=>{
      this.sessionState.next(this.isLogin());
    });
    let user = localStorage.getItem(USER);
    this.readJWT(user);
  }



  private readJWT(user: any | null,) {
    if (user) {
      try {
        user = JSON.parse(user);
        this.jwtHelper.decodeToken(user.access_token);
        this.user.next(user);
      } catch (error) {
      }
    }
  }

  public setUser(data: any) {
    localStorage.setItem(USER, JSON.stringify(data));

    try {
      let tempUser = JSON.parse(localStorage.getItem(USER));
      this.jwtHelper.decodeToken(tempUser.access_token);
      this.user.next(tempUser);
    } catch (error) {

    } 
  }

  public getUserId() {
    if (!this.user.value) {
      return;
    }

    return this.user.value.user.id;
  }

  public getUserName() {
    if (!this.user.value) {
      return;
    }

    return this.user.value.user.name;
  }

  public verifyToken() {

    if (!this.user.value) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(this.user.value.access_token)) {
      this.setUser(null);
      return false;
    }

    return true;
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    this.user.next(null);
  }

  public getAccessToken(): string {
    return this.user.value.access_token;
  }

  public isLogin(): boolean {
    if (this.user.value) {
      return true;
    }
    return false;
  }

  public getSessionState(): Observable<boolean> {
    return this.sessionState.asObservable();
  }

}