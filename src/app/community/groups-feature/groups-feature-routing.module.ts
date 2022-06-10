import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupMainPage } from './pages/group-main/group-main.page';

const routes: Routes = [
  { 
    path: '', 
    component: GroupsFeaturePage 
  },
  {
    path: 'group/:groupId',
    component: GroupMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsFeatureRoutingModule { }
