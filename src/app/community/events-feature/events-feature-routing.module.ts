import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsFeaturePage } from './events-feature.page';
import { EventDetailsPage } from './pages/event-details/event-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventsFeaturePage
  },
  {
    path: ':eventId',
    component: EventDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsFeatureRoutingModule { }
