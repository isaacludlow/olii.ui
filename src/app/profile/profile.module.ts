import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../components/shared/shared-components.module';
import { SavedImagesAlbumPage } from './pages/saved-photos-album/saved-images-album.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { CreateAlbumPopUpComponent } from './shared/components/create-album-pop-up/create-album-pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfilePage,
    SavedImagesAlbumPage,
    EditProfilePage,
    CreateAlbumPopUpComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
