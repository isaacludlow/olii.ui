import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupMainPage } from './pages/group-main/group-main.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';

const routes: Routes = [
  { 
    path: '', 
    component: GroupsFeaturePage 
  },
  {
    path: 'group/:groupId',
    component: GroupMainPage
  },
  {
    path: 'create',
    component: CreateGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsFeatureRoutingModule { }
