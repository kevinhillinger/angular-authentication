import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, lastValueFrom, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../../constants';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthenticationService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      const token = await this._authService.getAccessToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const authReq = req.clone({ headers });
        
      return lastValueFrom(next.handle(authReq).pipe(tap({
        error: (error) => {
          var respError = error as HttpErrorResponse;
          if (respError && (respError.status === 401 || respError.status === 403)) {
            this._router.navigate(['/unauthorized']);
          }
        }
      })));

    } else {
      return await lastValueFrom(next.handle(req));
    }
  }
}