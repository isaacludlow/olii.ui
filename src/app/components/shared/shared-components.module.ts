import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { ContainerImageCoverComponent } from './container-image-cover/container-image-cover.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    ContainerImageCoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    ContainerImageCoverComponent
  ]
})
export class SharedComponentsModule { }
