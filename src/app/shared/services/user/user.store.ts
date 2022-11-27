import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/models/dto/user/user.dto";
import { UserRequest } from "src/app/models/requests/user/user-request";
import { SubSink } from "subsink";
import { AuthStore } from "../authentication/auth-store";
import { DatabaseService } from "../bankend/database-service/database.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class UserStore implements OnDestroy {
  private _currentUser = new BehaviorSubject<User>(null);
  private subs = new SubSink();

    constructor(private dbService: DatabaseService, private userService: UserService, private authStore: AuthStore) {
        this.subs.sink = this.authStore.currentAuthenticatedUserData.subscribe(user => {
            if (user !== null) {
                this.subs.sink = this.subs.sink = this.dbService.getUserByUid(user.uid).subscribe(user => {
                    this._currentUser.next(user);
                });
            }
        });
    }

    get user(): Observable<User> {
        return this._currentUser.asObservable();
    }

    getUserByUid(userIdToken?: string): Observable<User> {
        return this.dbService.getUserByUid(userIdToken);
    }

    createUser(newUser: User): Observable<User> {
        return this.dbService.createUser(newUser);
    }
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
