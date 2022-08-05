import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/dto/user/user.dto';
import { UserService } from '../user/user.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private _user = new BehaviorSubject<User>(null);

  constructor(private authService: FirebaseAuthService, private userService: UserService) { }

  get user(): Observable<User> {
    if (this._user.value === null) {
      return this.authService.user.pipe(
        switchMap(user => this.userService.getUserByUid(user.uid).pipe(tap(user => this._user.next(user))))
      );
    } else {
      return this._user.asObservable();
    }
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map(user => !!user));
  }
}
