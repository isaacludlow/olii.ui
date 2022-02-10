import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { ContainerCoverImageComponent } from './container-cover-image/container-cover-image.component';

import { BaseCardComponent } from './base-card/base-card.component';
import { BaseDescriptionTextBoxComponent } from './base-description-text-box/base-description-text-box.component';
import { BlueCircleBackgroundComponent } from './blue-circle-background/blue-circle-background.component';
import { ToggleItemComponent } from './toggle-item/toggle-item.component';
import { DateTimePreviewComponent } from './date-time-preview/date-time-preview.component';
import { PurpleSquareBackgroundComponent } from './purple-square-background/purple-square-background.component';
import { LocationPreviewComponent } from './location-preview/location-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BaseIconComponent,
    BaseCardComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent,
    ContainerCoverImageComponent,
    ToggleItemComponent,
    DateTimePreviewComponent,
    PurpleSquareBackgroundComponent,
    LocationPreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [
    BaseIconComponent,
    BaseCardComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent,
    ContainerCoverImageComponent,
    ToggleItemComponent,
    DateTimePreviewComponent,
    PurpleSquareBackgroundComponent,
    LocationPreviewComponent
  ]
})
export class SharedComponentsModule { }
