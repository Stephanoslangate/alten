import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');
    const isBrowser = typeof window !== 'undefined';

    // Récupère le token uniquement si on est côté client
    const token = isBrowser ? localStorage.getItem('token') : null;
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
