import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { PartialProfile } from 'src/app/models/dto/profile/partial-profile.dto';
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

  createNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
    // Add API call code here
    return true;
  }
}
