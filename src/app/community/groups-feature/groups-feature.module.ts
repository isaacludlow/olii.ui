import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { GroupsFeatureComponent } from './groups-feature.component';


@NgModule({
  declarations: [
    GroupsFeatureComponent
  ],
  imports: [
    CommonModule,
    GroupsFeatureRoutingModule
  ]
})
export class GroupsFeatureModule { }
