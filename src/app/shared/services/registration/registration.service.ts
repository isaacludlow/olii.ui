import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from 'src/app/models/requests/registration/user-registration-request';
import firebase from 'firebase/compat';
import { FirebaseAuthService } from '../authentication/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private authService: FirebaseAuthService) { }

  registerUser(userInfo: UserRegistrationRequest): Observable<firebase.auth.UserCredential> {
    // TODO: Move this logic into the authStore and delete this service.
    // TODO: make call to api to record new registered user. Probably will need to use switchMap here.
    
    return this.authService.registerUser(userInfo.Email, userInfo.Password);
  }
}