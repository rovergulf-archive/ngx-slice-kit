import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(
        private api: ApiService,
        private auth: AuthService,
        private router: Router
    ) {
    }

    canLoad(route: Route): boolean | Observable<boolean> {
        return this.checkIfLoggedIn(`/${route.path}`);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.checkIfLoggedIn(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.canActivate(route, state);
    }

    checkIfLoggedIn(redirectUrl: string): boolean | Observable<boolean> {
        if (this.auth.isLoggedIn && this.auth.currentUser) {
            return this.auth.currentUser.hasRestrictedAccess;
        }

        this.auth.setAuthorized();
        return this.auth.authorizationConfirmed.pipe(
            map(ok => {
                if (!ok) {
                    this.auth.returnUrl = redirectUrl;
                    this.router.navigate(['login'], {queryParams: {redirectUrl}});
                }
                return this.auth.currentUser.hasRestrictedAccess;
            })
        );
    }

}
