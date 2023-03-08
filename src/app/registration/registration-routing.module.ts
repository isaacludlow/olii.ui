import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RegistrationFlowPage } from './pages/registration-flow/registration-flow.page';
import { RegistrationSlideshowPage } from './pages/registration-slideshow/registration-slideshow.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { RegistrationPage } from './registration.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },
  {
    path: 'registration-flow',
    component: RegistrationFlowPage,
    canLoad: [AuthGuard]
  },
  {
    path: 'slideshow',
    component: RegistrationSlideshowPage
  },
  {
    path: 'sign-in',
    component: SignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
