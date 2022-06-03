import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) { }

  canLoad(): boolean {
    const isAuthenticated = !!(localStorage.getItem('isAuthenticated'));

    switch (isAuthenticated) {
      case true:
        
        return true;
      case false:
        this.router.navigate(['registration/slideshow']);  

        return false;
        
      default:
        return false;
    }
  }
}
