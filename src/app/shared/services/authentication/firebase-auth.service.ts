import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  user = this.firebaseAuthService.user;
  subs = new SubSink();

  constructor(private firebaseAuthService: AngularFireAuth) { }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.firebaseAuthService.createUserWithEmailAndPassword(email, password)).pipe(
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}