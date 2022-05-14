import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [{ path: '', component: RegistrationComponent },]  {
    path: 'registration-slideshow',
    loadChildren: () => import('./pages/registration-slideshow/registration-slideshow.module').then( m => m.RegistrationSlideshowPageModule)
  }
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
