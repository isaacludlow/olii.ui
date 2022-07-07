import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    ScrollingModule
  ]
})
export class CommunityModule { }
