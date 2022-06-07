import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';
import { GroupsFeaturePage } from './groups-feature.page';
import { GroupMainPage } from './pages/group-main/group-main.page';


@NgModule({
  declarations: [
    GroupsFeaturePage,
    GroupMainPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    SharedComponentsModule,
    GroupsFeatureRoutingModule
  ]
})
export class GroupsFeatureModule { }
