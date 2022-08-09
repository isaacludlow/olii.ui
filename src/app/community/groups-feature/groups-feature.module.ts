import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupDetailsPage } from './pages/group-details/group-details.page';
import { CreateGroupPage } from './pages/create-group/create-group.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupMembersPage } from './pages/group-members/group-members.page';
import { MyGroupsPage } from './pages/groups-all/my-groups.page';
import { CommunityModule } from '../community.module';

@NgModule({
  declarations: [
    GroupsFeaturePage,
    GroupDetailsPage,
    CreateGroupPage,
    GroupMembersPage,
    MyGroupsPage
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
