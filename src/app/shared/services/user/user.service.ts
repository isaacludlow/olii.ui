import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/dto/user/user.dto';
import { mockUserData_loggedInUser } from './mock-user-data.dto';
import { UserRequest } from 'src/app/models/requests/user/user-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthStore } from '../authentication/auth-store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private authStore: AuthStore) {}

  getUserByUid(uid: string): Observable<User> {
    const response = this.httpClient.get<User>(`${environment.apiBaseUrl}/user`, { headers: { Authorization: this.authStore.userIdToken.value } });

    return response;
  }

  createUser(user: UserRequest): Observable<User> {
    const response = this.httpClient.post<User>(`${environment.apiBaseUrl}/user`, user, { headers: { Authorization: this.authStore.userIdToken.value } });

    return response;
  }
}
