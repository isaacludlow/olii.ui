import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { PartialProfile } from 'src/app/models/dto/profile/partial-profile.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { environment } from 'src/environments/environment';
import { mockEventData_eventById } from '../community/events-feature/mock-event-data';
import { AuthStore } from '../authentication/auth-store';
import { mockProfileData_yourProfile } from './mock-profile-data';
import { SavedAlbum } from 'src/app/models/dto/profile/saved-album.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private authStore: AuthStore) { }

  createNewProfile(profile: ProfileRequest) {
    return this.httpClient.post(`${environment.apiBaseUrl}/profile`, profile, { headers: { Authorization: this.authStore.userIdToken } });
  }

  getProfileById(profileId: number): Observable<Profile> {
    // Temporary for testing
    let params = new HttpParams().set('profileid', profileId);
    //let params = new HttpParams().set('profileid', 31);
    const response = this.httpClient.get<Profile>(`${environment.apiBaseUrl}/profile`, { headers: { Authorization: this.authStore.userIdToken }, params: params });    
    return response;
  }

  getProfileByUserId(userId: number): Observable<Profile> {
    //let params = new HttpParams().set('userid', userId);
    let params = new HttpParams().set('userid', 31);
    const response = this.httpClient.get<Profile>(`${environment.apiBaseUrl}/profile`, { headers: { Authorization: this.authStore.userIdToken }, params: params });
    //console.log(response);
    return response;
  }

  updateProfile(profileId: number, profileRequest: ProfileRequest): Observable<Profile> {
    let params = new HttpParams().set('profileid', profileId);
    //let params = new HttpParams().set('profileid', 31);
    const response = this.httpClient.put<Profile>(`${environment.apiBaseUrl}/profile`, profileRequest, { headers: { Authorization: this.authStore.userIdToken }, params: params });
    //const response = this.httpClient.put<Profile>(`${environment.apiBaseUrl}/profile`, { headers: new HttpHeaders({'Authorization': this.authStore.userIdToken}), params: params });
    return response;
  }

  // TODO: I don't think we actually use this... at least not yet because private groups are strictly invite only
  getFriends(id: number): Observable<PartialProfile[]> {
    var exampleFriends: PartialProfile[] = 
      [
        {
          Id: 81,
          FirstName: 'Irvin',
          LastName: 'Mendoza',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        },
        {
          Id: 182,
          FirstName: 'Maxwell',
          LastName: 'Pucket',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        },
        {
          Id: 92,
          FirstName: 'Marvin',
          LastName: 'Gutierrez',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        },
        {                    
          Id: 102,
          FirstName: 'Mark',
          LastName: 'Rober',
          ProfilePictureUrl: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
          
      ];

    return of(exampleFriends);
  }

  createAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
    // Add API call code here
    //const response = this.httpClient.post<SavedAlbum>(`${environment.apiBaseUrl}/profile/saved-album`, )
    return true;
  }
}
