import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationSlideshowPage } from './pages/registration-slideshow/registration-slideshow.page';


@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationSlideshowPage
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
