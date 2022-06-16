import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { environment } from 'src/environments/environment';
import { convertBlobToBase64 } from '../../utilities';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfileById(id: number): Observable<Profile> {
    var profileExampleData: Profile = {
      Id: 98,
      FirstName: 'John',
      LastName: 'Doe',
      Friends: 127,
      Bio: "Livin' the dream life. Adventurer. Professional turtle racer.",
      HomeCountry: 'USA',
      HostCountry: 'Germany',
      CurrentCity: 'Berlin',
      ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
      ConnectedSocials: [<ConnectedSocial>{}],
      ImageUrls: [
        'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VjY2Vzc3xlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1559912147-f62c767ec0e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xpZmZ8ZW58MHx8MHx8&w=1000&q=80',
      ],
      SavedAlbums: [
        {
          Id: 1,
          // TODO: Setting of album cover image should be done in the Olii API.
          CoverImageUrl: 'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
          Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', PrivacyLevel: 'Private',
          ImageUrls: [
            'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
            'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
          ]
        },
        {
          Id: 2,
          // TODO: Setting of album cover image should be done in the Olii API.
          CoverImageUrl: 'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
          Title: 'Saved Photos', Description: 'All your random pics from things you don\'t want to lose track of.', PrivacyLevel: 'Public',
          ImageUrls: [
            'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
            'https://images.unsplash.com/photo-1564245709234-fd3de5cacd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
            'https://images.unsplash.com/photo-1611153662496-c232240334a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60'
          ]
        }
      ]
    };
    
    return of(profileExampleData);
  }
  
  createNewProfile(profile: ProfileRequest) {
    return this.httpClient.post(`${environment.apiBaseUrl}`, profile);
  }

  createNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
    // Add API call code here
    return true;
  }
}
