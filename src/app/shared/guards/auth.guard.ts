import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthStore } from '../services/authentication/auth-store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authStore: AuthStore, private router: Router) { }

  canLoad() {
    return this.authStore.isAuthenticated.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated)
          this.router.navigate(['registration/slideshow']);  
        })
    );
  }
}
