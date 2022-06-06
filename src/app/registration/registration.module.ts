import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { RegistrationSlideshowPage } from './pages/registration-slideshow/registration-slideshow.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../components/shared/shared-components.module';
import { RegistrationFlowPage } from './pages/registration-flow/registration-flow.page';


@NgModule({
  declarations: [
    RegistrationPage,
    RegistrationSlideshowPage,
    RegistrationFlowPage
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    IonicModule,
    SharedModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }
