import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { PartialProfile } from 'src/app/models/dto/profile/partial-profile.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { environment } from 'src/environments/environment';
import { AuthStore } from '../authentication/auth-store';
import { ProfileRequestSavedAlbum } from 'src/app/models/requests/profile/profile-request-saved-album';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private authStore: AuthStore) { }

  createNewProfile(profile: ProfileRequest) {
    return this.httpClient.post(`${environment.apiBaseUrl}/profile`, profile, { headers: { Authorization: this.authStore.userIdToken } });
  }

  getProfileById(profileId: number): Observable<Profile> {
    let params = new HttpParams().set('profileid', profileId);
    const response = this.httpClient.get<Profile>(`${environment.apiBaseUrl}/profile`, { headers: { Authorization: this.authStore.userIdToken }, params: params });    
    return response;
  }

  getProfileByUserId(userId: number): Observable<Profile> {
    let params = new HttpParams().set('userid', userId);
    const response = this.httpClient.get<Profile>(`${environment.apiBaseUrl}/profile`, { headers: { Authorization: this.authStore.userIdToken }, params: params });
    return response;
  }

  updateProfile(profileId: number, profileRequest: ProfileRequest): Observable<Profile> {
    let params = new HttpParams().set('profileid', profileId);
    const response = this.httpClient.put<Profile>(`${environment.apiBaseUrl}/profile`, profileRequest, { headers: { Authorization: this.authStore.userIdToken }, params: params });
    return response;
  }

  // TODO: I don't think we actually use this... at least not yet because private groups are strictly invite only
  getFriends(id: number): Observable<PartialProfile[]> {
    var exampleFriends: PartialProfile[] = 
      [
        {
          ProfileId: 81,
          FirstName: 'Irvin',
          LastName: 'Mendoza',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        },
        {
          ProfileId: 182,
          FirstName: 'Maxwell',
          LastName: 'Pucket',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        }
      ];

    return of(exampleFriends);
  }

  createAlbum(newAlbum: ProfileRequestSavedAlbum) {
    // Add API call code here
    //const response = this.httpClient.post<SavedAlbum>(`${environment.apiBaseUrl}/profile/saved-album`, )
    return true;
  }
}
