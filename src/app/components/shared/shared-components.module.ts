import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { BaseDescriptionTextBoxComponent } from './base-description-text-box/base-description-text-box.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    BaseDescriptionTextBoxComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    BaseDescriptionTextBoxComponent
  ]
})
export class SharedComponentsModule { }
