import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SavedImagesAlbum } from 'src/app/models/dto/profile/saved-images-album.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './saved-images-album.page.html',
  styleUrls: ['./saved-images-album.page.scss']
})
export class SavedImagesAlbumPage implements OnInit {
  album: SavedImagesAlbum;
  subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileStore: ProfileStore
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
          const profileId = paramMap.get('profileId');
          const albumId = paramMap.get('albumId');

          return this.profileStore.getSavedImagesAlbum(profileId, albumId);
        }
      )
    ).subscribe(album => this.album = album);
  }

  navigateBackToSavedSection(): void {
    this.profileStore.profileSection = 'saved';
    this.router.navigate(['/profile']);
  }
}
