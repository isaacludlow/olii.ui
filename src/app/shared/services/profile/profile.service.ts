import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
      ProfileId: 98,
      UserId: 98,
      NumberOfConnections: 127,
      Bio: "Livin' the dream life. Adventurer. Professional turtle racer.",
      HomeCountry: 'USA',
      HostCountry: 'Germany',
      HostCity: 'Berlin',
      ProfilePictureUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
      ProfileImages: [
        <ProfileImage>{ Id: 1, Url: 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 2, Url: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 3, Url: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFjdGl2ZXxlbnwwfHwwfHw%3D&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 4, Url: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXlhbm1hcnxlbnwwfHwwfHw%3D&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 5, Url: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', DownloadedImage: null },
        <ProfileImage>{ Id: 6, Url: 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VjY2Vzc3xlbnwwfHwwfHw%3D&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 7, Url: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 8, Url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&w=1000&q=80', DownloadedImage: null },
        <ProfileImage>{ Id: 9, Url: 'https://images.unsplash.com/photo-1559912147-f62c767ec0e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xpZmZ8ZW58MHx8MHx8&w=1000&q=80', DownloadedImage: null },
      ],
      SavedImagesAlbums: [
        {
          Id: 1,
          CoverImage: null, Title: 'My Photos', Description: 'Personal photos that mean a lot to you.', Visibility: 'Private',
          Images: [
            'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
            'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
          ]
        },
        {
          Id: 2,
          CoverImage: null, Title: 'Saved Photos', Description: 'All your random pics from things you don\'t want to lose track of.', Visibility: 'Public',
          Images: [
            'https://images.unsplash.com/photo-1619537901863-9807597cb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
            'https://images.unsplash.com/photo-1564245709234-fd3de5cacd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
            'https://images.unsplash.com/photo-1611153662496-c232240334a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60'
          ]
        }
      ]
    };

    // TODO: Setting of album cover image should be done in the Olii API.
    profileExampleData.SavedImagesAlbums.forEach(album => album.CoverImage = album.Images[0]);


    return of(profileExampleData);
  }

  asdf() {
    return this.httpClient.get('https://images.unsplash.com/photo-1648735883246-eb69122d1037?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', { observe: 'response', responseType: 'blob' })
      .pipe(switchMap(res => from(convertBlobToBase64(res.body))));
  };
}
