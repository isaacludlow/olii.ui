import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFeatureRoutingModule } from './events-feature-routing.module';
import { EventsFeaturePage } from './events-feature.page';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventDetailsPage } from './pages/event-details/event-details.page';
import { CommunityModule } from '../community.module';
import { MyEventsPage } from './pages/my-events/my-events.page';
import { CreateEventPage } from './pages/create-event/create-event.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsFeaturePage,
    EventDetailsPage,
    MyEventsPage,
    CreateEventPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventsFeatureRoutingModule,
    SharedComponentsModule,
    ScrollingModule,
    SharedModule,
    CommunityModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsFeatureModule { }
