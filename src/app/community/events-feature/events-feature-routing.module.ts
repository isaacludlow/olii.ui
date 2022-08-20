import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsFeaturePage } from './events-feature.page';
import { CreateEventPage } from './pages/create-event/create-event.page';
import { EventAttendeesPage } from './pages/event-attendees/event-attendees.page';
import { EventDetailsPage } from './pages/event-details/event-details.page';
import { MyEventsPage } from './pages/my-events/my-events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsFeaturePage
  },
  {
    path: 'my-events',
    component: MyEventsPage
  },
  {
    path: 'create',
    component: CreateEventPage
  },
  {
    path: ':eventId',
    component: EventDetailsPage
  },
  {
    path: ':eventId/attendees',
    component: EventAttendeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsFeatureRoutingModule { }
