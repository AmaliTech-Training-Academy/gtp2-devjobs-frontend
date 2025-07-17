import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/authservice/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
