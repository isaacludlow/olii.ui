import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/dto/user/user.dto';
import { UserRequest } from 'src/app/models/requests/user/user-request';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../authentication/auth-store';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private authStore: AuthStore) { }

  // // The userIdToken needs to be passed in when the user is registering for an account. After that the application will save it and get it from the authStore.
  // getUserByUid(userIdToken?: string): Observable<User> {
  //   userIdToken = userIdToken ?? this.authStore.userIdToken;
  //   const response = this.httpClient.get<User>(`${environment.apiBaseUrl}/user`, { headers: { Authorization: userIdToken, 'x-functions-key': environment.functionsKey } });

  //   return response;
  // }

  // createUser(user: UserRequest, userIdToken: string): Observable<User> {
  //   const response = this.httpClient.post<User>(`${environment.apiBaseUrl}/user`, user, { headers: { Authorization: userIdToken, 'x-functions-key': environment.functionsKey } })

  //   return response;
  // }
}
