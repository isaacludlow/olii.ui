import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupDetailsPage } from './pages/group-details/group-details.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';
import { GroupMembersPage } from './pages/group-members/group-members.page';
import { GroupsAllPage } from './pages/groups-all/groups-all.page';

const routes: Routes = [
  { 
    path: '', 
    component: GroupsFeaturePage 
  },
  {
    path: 'group/:groupId',
    component: GroupDetailsPage
  },
  {
    path: 'group/:groupId/members',
    component: GroupMembersPage
  },
  {
    path: 'create',
    component: CreateGroupPage
  },
  {
    path: 'all',
    component: GroupsAllPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsFeatureRoutingModule { }
