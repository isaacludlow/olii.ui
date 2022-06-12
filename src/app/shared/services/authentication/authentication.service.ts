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
  isAuthenticated = this.authService.user.pipe(map(user => !!user));
  userCredentials: firebase.auth.UserCredential;

  constructor(private authService: AngularFireAuth) { }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.authService.createUserWithEmailAndPassword(email, password)).pipe(
      tap(userCredentials => this.userCredentials = userCredentials),
      catchError(error => {
        // TODO: Use ionic toast alert instead of the default alert.
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

  async login(email: string, password: string) {
    const userCredentials = await this.authService.signInWithEmailAndPassword(email, password);
    this.userCredentials = userCredentials;

    return userCredentials;
  }
}
