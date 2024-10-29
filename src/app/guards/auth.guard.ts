import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  // Check if running in the browser environment
  if (typeof window !== 'undefined' && localStorage.getItem('logged') === null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Log in first!',
    });

    _Router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
