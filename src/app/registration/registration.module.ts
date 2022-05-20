import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { RegistrationSlideshowPage } from './pages/registration-slideshow/registration-slideshow.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationPage,
    RegistrationSlideshowPage
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    IonicModule,
    SharedModule,
  ]
})
export class RegistrationModule { }
