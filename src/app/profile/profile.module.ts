import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../components/shared/shared-components.module';
import { SavedImagesAlbumPage } from './pages/saved-photos-album/saved-images-album.page';


@NgModule({
  declarations: [
    ProfilePage,
    SavedImagesAlbumPage
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule,
    SharedModule,
    SharedComponentsModule,
  ]
})
export class ProfileModule { }
