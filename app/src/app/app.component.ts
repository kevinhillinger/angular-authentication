import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './security/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private _authService: AuthenticationService) {
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit() {
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  isAdmin() {
    return this._authService.authContext && this._authService.authContext.isAdmin;
  }
}
