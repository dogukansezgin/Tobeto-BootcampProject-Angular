import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';

export const PreventLoginAccessGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    router.navigate([""])
    return false;

  } else {
    return true;
    
  }
};
