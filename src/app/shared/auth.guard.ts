import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then(
    authentifie => {
      if(authentifie) {
        console.log("Admin !");
        return true;
      } else {
        console.log("Pas admin !");
        router.navigate(['/home']);
        return false;
      }
    }
  );
};
