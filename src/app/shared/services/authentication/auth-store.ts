import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private _userCredentials: firebase.auth.UserCredential;

  constructor(private authService: FirebaseAuthService) { }

  get userCredentials(): firebase.auth.UserCredential {
    return this._userCredentials;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authService.user.pipe(map(user => !!user));
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.registerUser(email, password).pipe(tap(userCredentials => this._userCredentials = userCredentials));
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.login(email, password).pipe(tap(userCredentials => this._userCredentials = userCredentials));
  }
}
