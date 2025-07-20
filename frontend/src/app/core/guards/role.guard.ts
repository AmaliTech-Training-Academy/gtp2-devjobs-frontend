import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Auth } from '../services/authservice/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];

  if (auth.isLoggedIn() && auth.hasRole(expectedRole)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
