import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupMainPage } from './pages/group-main/group-main.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupMembersPage } from './pages/group-members/group-members.page';
import { GroupsAllPage } from './pages/groups-all/groups-all.page';
import { EditGroupPage } from './pages/edit-group/edit-group.page';

@NgModule({
  declarations: [
    GroupsFeaturePage,
    GroupMainPage,
    CreateGroupPage,
    GroupMembersPage,
    GroupsAllPage,
    EditGroupPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    GroupsFeatureRoutingModule
  ]
})
export class GroupsFeatureModule { }
