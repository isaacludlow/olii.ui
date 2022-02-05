import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { ContainerCoverImageComponent } from './container-cover-image/container-cover-image.component';

import { BaseCardComponent } from './base-card/base-card.component';
import { BaseDescriptionTextBoxComponent } from './base-description-text-box/base-description-text-box.component';
import { BlueCircleBackgroundComponent } from './blue-circle-background/blue-circle-background.component';
import { ToggleItemComponent } from './toggle-item/toggle-item.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    BaseCardComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent,
    ContainerCoverImageComponent,
    ToggleItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    BaseCardComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent,
    ContainerCoverImageComponent,
    ToggleItemComponent
  ]
})
export class SharedComponentsModule { }
