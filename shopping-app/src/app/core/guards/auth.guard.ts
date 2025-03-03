import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isLoggedin()) {
    router.navigate(['/auth/login']);
    console.log('User is not logged in! Redirecting to login page...');
    return false;
  }

  return true;
};
