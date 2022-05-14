import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community.component';

const routes: Routes = [
  // { path: '', component: CommunityComponent },
  { path: '', loadChildren: () => import('./events-feature/events-feature.module').then(m => m.EventsFeatureModule) },
  { path: 'groups', loadChildren: () => import('./groups-feature/groups-feature.module').then(m => m.GroupsFeatureModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
