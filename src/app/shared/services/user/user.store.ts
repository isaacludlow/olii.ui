import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/models/dto/user/user.dto";
import { UserRequest } from "src/app/models/requests/user/user-request";
import { AuthStore } from "../authentication/auth-store";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class UserStore {
  private _currentUser = new BehaviorSubject<User>(null);

    constructor(private userService: UserService, private authStore: AuthStore) {
        this.userService.getUserByUid(this.authStore.user.uid).subscribe(user => this._currentUser.next(user));
    }

    get user(): Observable<User> {
        return this._currentUser.asObservable();
    }

    getUserByUid(uid: string): Observable<User> {
        return this.userService.getUserByUid(uid).pipe(tap(user => this._currentUser.next(user)));
    }

    createUser(newUser: UserRequest): Observable<User> {
        return this.userService.createUser(newUser).pipe(tap(user => this._currentUser.next(user)));
    }
}
