import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  public readonly user = new BehaviorSubject<firebase.User>(null);

  constructor(private auth: AngularFireAuth) {
    if (auth) {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          this.user.next(user);
        } else {
          this.user.next(null);
        }
      });
    }
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        // TODO-AfterBeta: Use ionic toast alert instead of the default alert?
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
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        // TODO-AfterBeta: Use ionic toast alert instead of the default alert?
        alert(error.message);
        console.log(error)

        throw new Error(error.message);
      })
    );
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
