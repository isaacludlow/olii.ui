import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'create-album-pop-up',
  template: `

    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar class="popup-toolbar" color="primary-contrast">
        <ion-title><h3>Create album</h3></ion-title>
        <ion-buttons slot="end">
          <div class="back-icon" (click)="dismissModal()">
            <olii-icon-with-off-white-square-background name="close"></olii-icon-with-off-white-square-background>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input [formControl]="albumNameInput" placeholder="Album name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input [formControl]="albumDescriptionInput" placeholder="Album description"></ion-input>
      </ion-item>

      <hr>

      <ion-radio-group [(ngModel)]="albumVisibility" class="ion-margin-top">
      
        <ion-item>
          <ion-label class="visibility-label" color="tertiary">Public</ion-label>
          <ion-radio slot="end" color="primary" value='Public' mode="md"></ion-radio>
          <ion-label color="medium" position="stacked">Anyone can view posts in the group</ion-label>
        </ion-item>

        <ion-item>
          <ion-label class="visibility-label" color="tertiary">Private</ion-label>
          <ion-radio slot="end" color="primary" value="Private" mode="md"></ion-radio>
          <ion-label color="medium" position="stacked">Only members can view posts in the group</ion-label>
        </ion-item>

      </ion-radio-group>
      
      <ion-row class="ion-justify-content-center">
        <ion-button [disabled]="albumNameInput.invalid" color="primary" (click)="onCreateAlbum()">Create Album</ion-button>
      </ion-row>

    </ion-content>
  `,
  styleUrls: ['./create-album-pop-up.component.scss'],
})
export class CreateAlbumPopUpComponent implements OnInit {

  albumNameInput = new FormControl('', Validators.required);
  albumDescriptionInput = new FormControl('', Validators.required);
  albumVisibility:string = "Public";

  constructor(private profileStore: ProfileStore, private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  onCreateAlbum() {
    console.log(this.albumNameInput.value + " " + this.albumDescriptionInput.value + " " + this.albumVisibility);
    this.profileStore.postNewAlbum(this.albumNameInput.value, this.albumDescriptionInput.value, this.albumVisibility);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
