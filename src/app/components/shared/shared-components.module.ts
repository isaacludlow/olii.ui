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
import { ColoredSquareBackgroundComponent } from './colored-square-background/colored-square-background.component';
import { LocationPreviewComponent } from './location-preview/location-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePreviewIconsComponent } from './profile-preview-icons/profile-preview-icons.component';
import { IconWithPurpleSquareBackgroundComponent } from './icon-with-purple-square-background/icon-with-purple-square-background.component';
import { IconWithOffWhiteSquareBackgroundComponent } from './icon-with-off-white-square-background/icon-with-off-white-square-background.component';
import { ResponsiveAspectRatioContainerComponent } from './responsive-aspect-ratio-container/responsive-aspect-ratio-container.component';


@NgModule({
  declarations: [
    BaseIconComponent,
    BaseCardComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent,
    ContainerCoverImageComponent,
    ToggleItemComponent,
    DateTimePreviewComponent,
    ColoredSquareBackgroundComponent,
    LocationPreviewComponent,
    ProfilePreviewIconsComponent,
    IconWithPurpleSquareBackgroundComponent,
    IconWithOffWhiteSquareBackgroundComponent,
    ResponsiveAspectRatioContainerComponent
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
    ColoredSquareBackgroundComponent,
    LocationPreviewComponent,
    ProfilePreviewIconsComponent,
    IconWithPurpleSquareBackgroundComponent,
    IconWithOffWhiteSquareBackgroundComponent,
    ResponsiveAspectRatioContainerComponent
  ]
})
export class SharedComponentsModule { }
