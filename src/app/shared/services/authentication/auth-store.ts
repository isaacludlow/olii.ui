import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private _currentUser: firebase.User = null;
  userIdToken = new BehaviorSubject<string>(null);


  constructor(private authService: FirebaseAuthService) {
    this.authService.user.subscribe(userInfo => {
      this._currentUser = userInfo;
      if (!!userInfo) {
        userInfo.getIdToken().then(idToken => this.userIdToken.next(idToken));
      }
    });
  }

  get user(): firebase.User {
    return this._currentUser;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authService.user.pipe(map(user => !!user));
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.registerUser(email, password).pipe(tap(userCredentials => this._currentUser = userCredentials.user));
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.login(email, password).pipe(tap(userCredentials => this._currentUser = userCredentials.user));
  }

  signOut(): Promise<void> {
    return this.authService.signOut();
  }
}
