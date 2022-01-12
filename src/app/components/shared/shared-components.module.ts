import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BaseIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent
  ]
})
export class SharedComponentsModule { }
