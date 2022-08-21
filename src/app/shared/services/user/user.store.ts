import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/models/dto/user/user.dto";
import { UserRequest } from "src/app/models/requests/user/user-request";
import { SubSink } from "subsink";
import { AuthStore } from "../authentication/auth-store";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class UserStore implements OnDestroy {
  private _currentUser = new BehaviorSubject<User>(null);
  private subs = new SubSink();

    constructor(private userService: UserService, private authStore: AuthStore) {
        this.authStore.user.subscribe(async user => {
            if (user !== null) {
                const userIdToken = await user.getIdToken();
                this.subs.sink = this.userService.getUserByUid(userIdToken).subscribe(user => this._currentUser.next(user));
            }
        });
    }

    get user(): Observable<User> {
        return this._currentUser.asObservable();
    }

    getUserByUid(userIdToken?: string): Observable<User> {
        return this.userService.getUserByUid(userIdToken).pipe(tap(user => this._currentUser.next(user)));
    }

    createUser(newUser: UserRequest, userIdToken: string): Observable<User> {
        return this.userService.createUser(newUser, userIdToken).pipe(tap(user => this._currentUser.next(user)));
    }
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
