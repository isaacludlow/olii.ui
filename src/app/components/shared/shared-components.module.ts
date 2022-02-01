import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { BaseDescriptionTextBoxComponent } from './base-description-text-box/base-description-text-box.component';
import { BlueCircleBackgroundComponent } from './blue-circle-background/blue-circle-background.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    BaseDescriptionTextBoxComponent,
    BlueCircleBackgroundComponent
  ]
})
export class SharedComponentsModule { }
