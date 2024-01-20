import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthenticationInterceptor } from './authentication/authentication.interceptor';
import { AuthenticationService } from './authentication/authentication.service';
import { AccountService } from './account.service';
import { ProjectService } from '../projects/project.service';
import { AdminRouteGuard } from './admin-route-guard';
import { userManagerProvider } from './authentication/user-manager.service.provider';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        AuthenticationService,
        AccountService,
        ProjectService,
        AdminRouteGuard,
        userManagerProvider,
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptor, multi: true }
    ],
})
export class SecurityModule {}
