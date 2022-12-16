import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryPhoto } from '@capacitor/camera';
import { selectImages } from 'src/app/shared/utilities';
import { SubSink } from 'subsink';

@Component({
  selector: 'olii-edit-images',
  template: `
    <div class="images-container">
        <div class="image" *ngFor="let image of images; let i = index">
            <olii-responsive-aspect-ratio-container aspectRatio="1/1">
                <ion-badge (click)="removeEventImage(i)"><ion-icon name="close"></ion-icon></ion-badge>
                <olii-container-cover-image [imageUrl]="sanitizeUrl(image.webPath)" boarderRadius="3%"></olii-container-cover-image>
            </olii-responsive-aspect-ratio-container>
        </div>
        <div class="add-image" *ngIf="images.length < 9" (click)="setEventImages()">
            <olii-base-icon name="add-circle-outline" color="primary"></olii-base-icon>
        </div>
    </div>
  `,
  styleUrls: ['./edit-images.component.scss']
})
export class EditImagesComponent {
  @Input() images: GalleryPhoto[] = [];
  @Output() imagesEvent = new EventEmitter<GalleryPhoto[]>();

  constructor(
    private domSanitizer: DomSanitizer,
  ) { }

  async setEventImages() {
    let numberOfImagesAllowedToUpload = 9 - this.images.length;
    this.images.push(...(await selectImages(numberOfImagesAllowedToUpload).toPromise()));
    this.imagesEvent.emit(this.images);
  }

  removeEventImage(imageIndex: number): void {
    this.images.splice(imageIndex, 1);
    this.imagesEvent.emit(this.images);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
