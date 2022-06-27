import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFeatureRoutingModule } from './events-feature-routing.module';
import { EventsFeaturePage } from './events-feature.page';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventDetailsPage } from './pages/event-details/event-details.page';
import { CommunityModule } from '../community.module';

@NgModule({
  declarations: [
    EventsFeaturePage,
    EventDetailsPage
  ],
  imports: [
    CommonModule,
    EventsFeatureRoutingModule,
    IonicModule,
    SharedComponentsModule,
    ScrollingModule,
    SharedModule,
    CommunityModule
  ]
})
export class EventsFeatureModule { }
