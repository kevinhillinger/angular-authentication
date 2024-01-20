import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AdminRouteGuard implements CanActivate {
    constructor(private _authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return !!this._authService.authContext &&
        this._authService.authContext.isAdmin;
    }
}