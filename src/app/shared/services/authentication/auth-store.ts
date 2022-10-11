import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth.service';
import firebase from 'firebase/compat';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class AuthStore implements OnDestroy {
  private _currentAuthenticatedUserData = new BehaviorSubject<firebase.User>(null);
  private subs = new SubSink();

  constructor(private authService: FirebaseAuthService) {
    this.subs.sink = this.authService.user.subscribe(user => {
      this._currentAuthenticatedUserData.next(user);
    });
  }

  get currentAuthenticatedUserData(): Observable<firebase.User> {
    return this._currentAuthenticatedUserData.asObservable();
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authService.user.pipe(map(user => !!user));
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.registerUser(email, password);
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return this.authService.login(email, password);
  }

  signOut(): Promise<void> {
    return this.authService.signOut();
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
