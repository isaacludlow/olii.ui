import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedImagesAlbumPage } from './pages/saved-photos-album/saved-images-album.page';
import { ProfilePage } from './profile.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'album/:profileId/:albumId',
    component: SavedImagesAlbumPage
  },
  {
    path: 'edit/:profileId',
    component: EditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
