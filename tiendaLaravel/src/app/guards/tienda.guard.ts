import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.router.navigate(['/tienda']);
      return false;
    } else {
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');
    const idRol = sessionStorage.getItem('rol_id');

    if (!token || !idRol) {
      // Si el usuario no tiene un token o idRol, significa que no está autenticado
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/auth']);
      return false;
    } else if (idRol === '2') {
      // Si el usuario está autenticado pero su idRol no es '2', significa que no tiene acceso de administrador
      // Redirigir al usuario a una página de acceso no autorizado
      this.router.navigate(['/tienda']);
      return false;
    }

    // Si el usuario tiene un token y idRol es '2', permitir el acceso a la ruta de administrador
    return true;
  }
}
