import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community.component';

const routes: Routes = [
  { path: '', component: CommunityComponent },
  { path: 'events-feature', loadChildren: () => import('./events-feature/events-feature.module').then(m => m.EventsFeatureModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
