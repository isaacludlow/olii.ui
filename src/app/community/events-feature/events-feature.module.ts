import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFeatureRoutingModule } from './events-feature-routing.module';
import { EventsFeatureComponent } from './events-feature.component';


@NgModule({
  declarations: [
    EventsFeatureComponent
  ],
  imports: [
    CommonModule,
    EventsFeatureRoutingModule
  ]
})
export class EventsFeatureModule { }
