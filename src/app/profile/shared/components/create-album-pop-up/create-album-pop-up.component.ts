import { Component } from '@angular/core';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProfileRequestSavedAlbum } from 'src/app/models/requests/profile/profile-request-saved-album';
import { PrivacyLevelRequest } from 'src/app/models/requests/misc/privacy-level-request.do';

@Component({
  selector: 'create-album-pop-up',
  template: `

    <div class="close-modal" (click)="dismissModal()">
      <olii-icon-with-off-white-square-background name="close"></olii-icon-with-off-white-square-background>
    </div>
    <div class="header">
      <h3>Create album</h3>
    </div>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input [formControl]="albumNameInput" placeholder="Album name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input [formControl]="albumDescriptionInput" placeholder="Album description"></ion-input>
      </ion-item>

      <div class="spacer"></div>

      <ion-radio-group [(ngModel)]="albumVisibility" class="ion-margin-top">
      <!-- TODO: Change this text back to create album related text and create a new modal for groups or pass in the label. -->
        <ion-item>
          <div>
            <ion-label class="visibility-label" color="tertiary" mode="ios">Public</ion-label>
            <ion-label class="visibility-description" color="medium" mode="ios">Anyone can view posts in the group</ion-label>
          </div>
          <ion-radio slot="end" color="primary" value='9' mode="md"></ion-radio>
        </ion-item>

        <ion-item>
          <div>
            <ion-label class="visibility-label" color="tertiary" mode="ios">Private</ion-label>
            <ion-label class="visibility-description" color="medium" mode="ios">Only members can view posts in the group</ion-label>
          </div>
          <ion-radio slot="end" color="primary" value="12" mode="md"></ion-radio>
        </ion-item>

      </ion-radio-group>
      
      <ion-row class="ion-justify-content-center">
        <ion-button [disabled]="albumNameInput.invalid" color="primary" (click)="onCreateAlbum()" mode="ios">Create Album</ion-button>
      </ion-row>

    </ion-content>
  `,
  styleUrls: ['./create-album-pop-up.component.scss'],
})
export class CreateAlbumPopUpComponent {

  albumNameInput = new FormControl('', Validators.required);
  albumDescriptionInput = new FormControl('', Validators.required);
  albumVisibility: number = 9;

  constructor(private profileStore: ProfileStore, private modalCtrl: ModalController) { }

  onCreateAlbum() {

    const newAlbum: ProfileRequestSavedAlbum = {
      Id: this.profileStore.currentProfile.value.ProfileId,
      CoverImageFile: null,
      Title: this.albumNameInput.value,
      Description: this.albumDescriptionInput.value,
      PrivacyLevel: this.albumVisibility as PrivacyLevelRequest,
      ImageFiles: null,
    }

    this.profileStore.createAlbum(newAlbum);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
