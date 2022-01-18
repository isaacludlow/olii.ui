import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { BlueCircleBackgroundComponent } from './blue-circle-background/blue-circle-background.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    BlueCircleBackgroundComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    BlueCircleBackgroundComponent
  ]
})
export class SharedComponentsModule { }
