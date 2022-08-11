import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/dto/user/user.dto';
import { mockUserData_loggedInUser } from './mock-user-data.dto';
import { UserRequest } from 'src/app/models/requests/user/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserByUid(uid: string) {
    const response = mockUserData_loggedInUser;

    return of(response);
  }

  createUser(user: UserRequest): Observable<User> {
    const response = mockUserData_loggedInUser;

    return of(response);
  }
}
