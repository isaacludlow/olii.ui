import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConnectedSocial } from 'src/app/models/dto/profile/connected-social.dto';
import { ProfileImage } from 'src/app/models/dto/profile/profile-image.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
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
      Connections: 127,
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
          CoverImageUrl: null, Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', PrivacyLevel: 'Private',
          Images: [
            'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
            'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
          ]
        },
        {
          Id: 2,
          CoverImageUrl: null, Title: 'Saved Photos', Description: 'All your random pics from things you don\'t want to lose track of.', PrivacyLevel: 'Public',
          Images: [
            'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
            'https://images.unsplash.com/photo-1564245709234-fd3de5cacd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
            'https://images.unsplash.com/photo-1611153662496-c232240334a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60'
          ]
        }
      ]
    };

    // TODO: Setting of album cover image should be done in the Olii API.
    profileExampleData.SavedAlbums.forEach(album => album.CoverImageUrl = album.Images[0]);


    return of(profileExampleData);
  }

  getFriends(id: number): Observable<Profile[]> {
    var exampleFriends: Profile[] = 
      [
        {
          Id: 81,
          FirstName: 'Irvin',
          LastName: 'Mendoza',
          Connections: 32,
          Bio: "Developers developers developers developers",
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
          ],
          SavedAlbums: [
            {
              Id: 1,
              CoverImageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80', Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', PrivacyLevel: 'Private',
              Images: [
                'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
                'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
                'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
              ]
            },
          ]
        },
        {
          Id: 102,
          FirstName: 'Maxwell',
          LastName: 'Pucket',
          Connections: 32,
          Bio: "Just an ordinary dude doing extraordinary things",
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
          ],
          SavedAlbums: [
            {
              Id: 1,
              CoverImageUrl: null, Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', PrivacyLevel: 'Private',
              Images: [
                'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
                'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
                'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
              ]
            },
          ]
        },
        {
          Id: 92,
          FirstName: 'Marvin',
          LastName: 'Gutierrez',
          Connections: 235,
          Bio: "Yeah",
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
          ],
          SavedAlbums: [
            {
              Id: 1,
              CoverImageUrl: 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80', Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', PrivacyLevel: 'Private',
              Images: [
                'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
                'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
                'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
              ]
            },
            {
              Id: 2,
              CoverImageUrl: 'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80', Title: 'Saved Photos', Description: 'All your random pics from things you don\'t want to lose track of.', PrivacyLevel: 'Public',
              Images: [
                'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
                'https://images.unsplash.com/photo-1564245709234-fd3de5cacd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
                'https://images.unsplash.com/photo-1611153662496-c232240334a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60'
              ]
            }
          ]
        },
      ];

    return of(exampleFriends);
  }

  postNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
    // Add API call code here
    return true;
  }

  asdf() {
    return this.httpClient.get('https://images.unsplash.com/photo-1648735883246-eb69122d1037?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', { observe: 'response', responseType: 'blob' })
      .pipe(switchMap(res => from(convertBlobToBase64(res.body))));
  };
}
