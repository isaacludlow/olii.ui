import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CommunityComponent,
    EventCardComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    IonicModule,
    ScrollingModule,
    SharedComponentsModule,
    SharedModule
  ],
  exports: [
    EventCardComponent
  ]
})
export class CommunityModule { }
