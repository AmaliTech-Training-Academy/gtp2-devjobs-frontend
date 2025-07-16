import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../services/authservice/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth
      .isLoggedIn()
      .pipe(
        map((isAuthenticated) =>
          isAuthenticated ? true : this.router.createUrlTree(['/login'])
        )
      );
  }
}
