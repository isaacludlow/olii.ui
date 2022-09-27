import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanLoad, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthStore } from '../services/authentication/auth-store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AngularFireAuth, private router: Router) { }

  canLoad() {
    return this.auth.user.pipe(
      map(user => !!user),
      tap(isAuthenticated => {
        console.log(isAuthenticated)
        if (!isAuthenticated)
          this.router.navigate(['registration/slideshow']);  
        })
    );
  }
}
