import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFeatureRoutingModule } from './events-feature-routing.module';
import { EventsFeaturePage } from './events-feature.page';

@NgModule({
  declarations: [
    EventsFeaturePage
  ],
  imports: [
    CommonModule,
    EventsFeatureRoutingModule
  ]
})
export class EventsFeatureModule { }
