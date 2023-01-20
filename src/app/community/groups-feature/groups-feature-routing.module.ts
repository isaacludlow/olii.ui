import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupDetailsPage } from './pages/group-details/group-details.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';
import { GroupMembersPage } from './pages/group-members/group-members.page';
import { MyGroupsPage } from './pages/my-groups/my-groups.page';
import { EditGroupPage } from './pages/edit-group/edit-group.page';
import { AllGroupsPage } from './pages/all-groups/all-groups.page'

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
    path: 'group/:groupId/edit',
    component: EditGroupPage
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
    path: 'my-groups',
    component: MyGroupsPage
  },
  {
    path: 'all-groups',
    component: AllGroupsPage
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsFeatureRoutingModule { }
