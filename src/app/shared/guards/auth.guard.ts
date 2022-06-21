import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canLoad() {
    return this.authService.isAuthenticated.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated)
          this.router.navigate(['registration/slideshow']);  
        }
      ));
  }
}
