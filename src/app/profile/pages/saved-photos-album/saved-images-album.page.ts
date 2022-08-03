import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SavedAlbum } from 'src/app/models/dto/profile/saved-album.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './saved-images-album.page.html',
  styleUrls: ['./saved-images-album.page.scss']
})
export class SavedImagesAlbumPage implements OnInit {
  album: SavedAlbum;
  subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileStore: ProfileStore
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.profileStore.getProfileById(+paramMap.get('profileId'))
        .pipe(map(profile => profile.SavedAlbums.find(x => x.Id === +paramMap.get('albumId'))))
      )
    ).subscribe(album => this.album = album);
  }

  navigateBackToSavedSection(): void {
    // TODO: Move this to the profile page so that it's not hard coded here.
    this.profileStore.profileSection = 'saved';
    this.router.navigate(['/profile']);
  }
}
