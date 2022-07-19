import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockUserData_loggedInUser } from './mock-user-data.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserByUid(userUid: string) {
    const response = mockUserData_loggedInUser;

    return of(response);
  }
}
