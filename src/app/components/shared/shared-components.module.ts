import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { ContainerCoverImageComponent } from './container-cover-image/container-cover-image.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    ContainerCoverImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    ContainerCoverImageComponent
  ]
})
export class SharedComponentsModule { }
