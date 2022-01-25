import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseIconComponent } from './base-icon/base-icon.component';
import { IonicModule } from '@ionic/angular';
import { BaseCardComponent } from './base-card/base-card.component';



@NgModule({
  declarations: [
    BaseIconComponent,
    BaseCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BaseIconComponent,
    BaseCardComponent
  ]
})
export class SharedComponentsModule { }
