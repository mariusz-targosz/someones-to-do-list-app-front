import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/features/account/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService,
    private readonly _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this._authService.isLoggedIn
    if (isAuthenticated) {
      return true;
    }

    this._router.navigate(['account/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}