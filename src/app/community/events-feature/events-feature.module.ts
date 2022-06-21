import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsFeatureRoutingModule } from './events-feature-routing.module';
import { EventsFeaturePage } from './events-feature.page';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';

@NgModule({
  declarations: [
    EventsFeaturePage,
    EventCardComponent
  ],
  imports: [
    CommonModule,
    EventsFeatureRoutingModule,
    IonicModule,
    SharedComponentsModule
  ]
})
export class EventsFeatureModule { }
