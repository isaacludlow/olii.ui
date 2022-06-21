import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from 'src/app/models/requests/registration/user-registration-request';
import { AuthenticationService } from './authentication/authentication.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private authService: AuthenticationService) { }

  registerUser(userInfo: UserRegistrationRequest): Observable<firebase.auth.UserCredential> {
    // TODO: make call to api to record new registered user. Probably will need to use switchMap here.
    
    return this.authService.registerUser(userInfo.Email, userInfo.Password);
  }
}
