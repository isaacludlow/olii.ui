import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFlowPage } from './pages/registration-flow/registration-flow.page';
import { RegistrationSlideshowPage } from './pages/registration-slideshow/registration-slideshow.page';
import { RegistrationPage } from './registration.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },
  {
    path: 'registration-flow',
    component: RegistrationFlowPage
  },
  {
    path: 'slideshow',
    component: RegistrationSlideshowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
