import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../security/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-callback',
  template: `<div></div>`
})

export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthenticationService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.completeLogin().then((_: any) => {
      this._router.navigate(['/'], { replaceUrl: true });
    })
  }
}