import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { Constants } from '../../constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SecurityContext } from '../authorization/security-context';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User | null;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();
  authContext: SecurityContext;

  constructor(private userManager: UserManager, private httpClient: HttpClient) {
    this.userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
    this.userManager.events.addUserLoaded(user => {
      if (this.user !== user) {
        this.user = user;
        this.loadSecurityContext();
        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });

  }

  login() {
    return this.userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then(user => {
      if (user === null) {
        return false;
      }
      
      const userCurrent = !!user && !user.expired;
      if (this.user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      if (userCurrent && !this.authContext) {
        this.loadSecurityContext();
      }
      this.user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  completeLogout() {
    this.user = null;
    this._loginChangedSubject.next(false);
    return this.userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this.userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

  loadSecurityContext() {
    this.httpClient
      .get<SecurityContext>(`${Constants.apiRoot}Projects/AuthContext`)
      .subscribe(
        context => {
          this.authContext = new SecurityContext();
          this.authContext.claims = context.claims;
          this.authContext.userProfile = context.userProfile;
        },
        error => console.error(error)
      );
  }

}