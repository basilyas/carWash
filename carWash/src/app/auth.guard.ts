import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    // On the server side, just prevent navigation or allow it carefully
    router.navigate(['/login']);
    return false;
  }
};
