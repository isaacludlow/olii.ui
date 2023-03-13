import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './shared/base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { ContainerCoverImageComponent } from './shared/container-cover-image/container-cover-image.component';
import { RouterModule } from '@angular/router';

import { BaseCardComponent } from './shared/base-card/base-card.component';
import { BaseDescriptionTextBoxComponent } from './shared/base-description-text-box/base-description-text-box.component';
import { BlueCircleBackgroundComponent } from './shared/blue-circle-background/blue-circle-background.component';
import { ToggleItemComponent } from './shared/toggle-item/toggle-item.component';
import { DateTimePreviewComponent } from './shared/date-time-preview/date-time-preview.component';
import { ColoredSquareBackgroundComponent } from './shared/colored-square-background/colored-square-background.component';
import { LocationPreviewComponent } from './shared/location-preview/location-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePreviewIconsComponent } from './shared/profile-preview-icons/profile-preview-icons.component';
import { IconWithPurpleSquareBackgroundComponent } from './shared/icon-with-purple-square-background/icon-with-purple-square-background.component';
import { IconWithOffWhiteSquareBackgroundComponent } from './shared/icon-with-off-white-square-background/icon-with-off-white-square-background.component';
import { ResponsiveAspectRatioContainerComponent } from './shared/responsive-aspect-ratio-container/responsive-aspect-ratio-container.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { GroupPreviewIconsComponent } from './shared/group-preview-icons/group-preview-icons.component';
import { EditImagesComponent } from './shared/edit-images/edit-images.component';
import { FullscreenImageViewerComponent } from './shared/fullscreen-image-viewer/fullscreen-image-viewer.component';
import { BaseSpacerComponent } from './layout/spacers/base-spacer/base-spacer.component';
import { OneRemSpacerComponent } from './layout/spacers/one-rem-spacer/one-rem-spacer.component';
import { BaseHeaderComponent } from './headers/base-header/base-header.component';
import { CollapsiblePurpleHeaderWithOneButtonSectionOneComponent } from './headers/collapsible-purple-header-with-one-button-section-one/collapsible-purple-header-with-one-button-section-one.component';
import { CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent } from './headers/collapsible-purple-header-with-one-button-section-two/collapsible-purple-header-with-one-button-section-two.component';
import { TransparentHeaderWithTwoButtonsComponent } from './headers/transparent-header-with-two-buttons/transparent-header-with-two-buttons.component';

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
    ResponsiveAspectRatioContainerComponent,
    BackButtonComponent,
    GroupPreviewIconsComponent,
    EditImagesComponent,
    FullscreenImageViewerComponent,
    BaseSpacerComponent,
    OneRemSpacerComponent,
    BaseHeaderComponent,
    CollapsiblePurpleHeaderWithOneButtonSectionOneComponent,
    CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent,
    TransparentHeaderWithTwoButtonsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule
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
    ResponsiveAspectRatioContainerComponent,
    BackButtonComponent,
    GroupPreviewIconsComponent,
    EditImagesComponent,
    FullscreenImageViewerComponent,
    BaseSpacerComponent,
    OneRemSpacerComponent,
    BaseHeaderComponent,
    CollapsiblePurpleHeaderWithOneButtonSectionOneComponent,
    CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent,
    TransparentHeaderWithTwoButtonsComponent
  ]
})
export class SharedComponentsModule { }
