import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExceptionCode } from '@capacitor/core';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = this.firebaseAuthService.user.pipe(map(user => !!user));
  userCredentials: firebase.auth.UserCredential;

  constructor(private firebaseAuthService: AngularFireAuth) { }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.firebaseAuthService.createUserWithEmailAndPassword(email, password)).pipe(
      tap(userCredentials => this.userCredentials = userCredentials),
      catchError(error => {
        // TODO: Use ionic toast alert instead of the default alert?
        if (error.code === 'auth/email-already-in-use') {
          alert('This email address is already in use by another account.');

          throw new Error(error.message);
        } else if (error.code === 'auth/weak-password') {
          alert('Your password is too weak. Please try adding a number or symbol.');

          throw new Error(error.message);
        } else {
          alert(error.message);

          throw new Error(error.message);
        }
      })
    );
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.firebaseAuthService.signInWithEmailAndPassword(email, password)).pipe(
      tap(userCredentials => this.userCredentials = userCredentials),
      catchError(error => {
        // TODO: Use ionic toast alert instead of the default alert?
        alert(error.message);

        throw new Error(error.message);
      })
    );
  }

  signOut(): Promise<void> {
    return this.firebaseAuthService.signOut();
  }
}
