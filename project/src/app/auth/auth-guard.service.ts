import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'toastr-ng2';
@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) {}
 showError(message: string) {
  this.toastrService.error(message, 'Error!');
}
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if (!this.authService.isAuthenticated()) {
     this.showError('Please log in to see this page!');
     this.router.navigate(['/']);
    }
   return this.authService.isAuthenticated();
 }
}
