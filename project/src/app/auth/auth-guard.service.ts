import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router) {}
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if (!this.authService.isAuthenticated()) {
     alert('Please log in to see this page!');
     this.router.navigate(['/']);
    }
   return this.authService.isAuthenticated();
 }
}
