import { Injectable } from '@angular/core';
import {
  Router,
  Route,
  CanActivate,
  CanLoad,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
      private api: ApiService,
      private auth: AuthService,
      private router: Router
  ) {
  }

  canLoad(route: Route): boolean | Observable<boolean> {
    return this.checkIsLoggedIn(`/${route.path}`);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkIsLoggedIn(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.canActivate(route, state);
  }

  checkIsLoggedIn(redirectUrl: string): boolean | Observable<boolean> {
    if (this.auth.isLoggedIn && this.auth.currentUser) {
      return true;
    }

    this.auth.setAuthorized();
    return this.auth.authorizationConfirmed.pipe(
        map(ok => {
          if (!ok) {
            this.auth.returnUrl = redirectUrl;
            this.router.navigate(['login'], {queryParams: {redirectUrl}});
          }
          return ok;
        })
    );
  }
}
