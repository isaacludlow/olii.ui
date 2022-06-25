import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { environment } from 'src/environments/environment';
import { mockProfileData_yourProfile } from './mock-profile-data';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfileById(id: number): Observable<Profile> {
    const response = mockProfileData_yourProfile;
    
    return of(response);
  }
  
  createNewProfile(profile: ProfileRequest) {
    return this.httpClient.post(`${environment.apiBaseUrl}`, profile);
  }

  createNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
    // Add API call code here
    return true;
  }
}
