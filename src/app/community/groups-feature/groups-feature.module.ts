import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { GroupsFeaturePage } from './groups-feature.page';


@NgModule({
  declarations: [
    GroupsFeaturePage
  ],
  imports: [
    CommonModule,
    GroupsFeatureRoutingModule
  ]
})
export class GroupsFeatureModule { }
