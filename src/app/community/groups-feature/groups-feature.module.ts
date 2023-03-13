import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupDetailsPage } from './pages/group-details/group-details.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupMembersPage } from './pages/group-members/group-members.page';
import { MyGroupsPage } from './pages/my-groups/my-groups.page';
import { EditGroupPage } from './pages/edit-group/edit-group.page';
import { CommunityModule } from '../community.module';
import { AllGroupsPage } from './pages/all-groups/all-groups.page'

@NgModule({
  declarations: [
    GroupsFeaturePage,
    GroupDetailsPage,
    CreateGroupPage,
    GroupMembersPage,
    MyGroupsPage,
    AllGroupsPage,
    EditGroupPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    GroupsFeatureRoutingModule,
    CommunityModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupsFeatureModule { }
