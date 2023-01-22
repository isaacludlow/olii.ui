import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'olii-fullscreen-image-viewer',
  template: `
  <ion-header>
    <ion-toolbar>
      <olii-icon-with-purple-square-background slot="end" size="medium" name="close" (click)="dismissModal()">
      </olii-icon-with-purple-square-background>
    </ion-toolbar>
  </ion-header>
  <ion-slides pager="true" [options]="{initialSlide: startingIndex}">
    <ion-slide *ngFor="let imageUrl of imageUrls">
      <olii-responsive-aspect-ratio-container aspectRatio="1/1" >
        <olii-container-cover-image [imageUrl]="imageUrl"></olii-container-cover-image>
      </olii-responsive-aspect-ratio-container>
      <!-- Only having the img tag will display the image in its original size. -->
      <!-- <img [src]="imageUrl"> -->
    </ion-slide>
  </ion-slides>
  `,
  styleUrls: ['./fullscreen-image-viewer.component.scss']
})
export class FullscreenImageViewerComponent {
  @Input() imageUrls: string[];
  @Input() startingIndex: number = 0;
  
  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
