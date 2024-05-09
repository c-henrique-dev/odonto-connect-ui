import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  const authService: AuthService = inject(AuthService);

  return authService.usuarioEstaLogado().pipe(
    tap((estaLogado) => {
      if (!estaLogado) {
        router.navigate(['auth/login']);
      }
    })
  );
};
