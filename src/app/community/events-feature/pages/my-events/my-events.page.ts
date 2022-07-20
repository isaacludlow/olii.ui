import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore, MyEventsFilterOptions } from 'src/app/shared/services/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss']
})
export class MyEventsPage implements OnInit {
  currentPageSegment = 'events';
  currentEventFilterSegment = 'attending';
  attendingEvents$: Observable<Event[]>;
  hostingEvents$: Observable<Event[]>;
  pastEvents$: Observable<Event[]>;

  constructor(
    private location: Location,
    private eventStore: EventsFeatureStore,
    private profileStore: ProfileStore
  ) { }

  ngOnInit(): void {
    const profileId = this.profileStore.currentUserProfile.Id;

    this.attendingEvents$ = this.eventStore.getMyEvents(profileId, MyEventsFilterOptions.Attending);
    this.hostingEvents$ = this.eventStore.getMyEvents(profileId, MyEventsFilterOptions.Hosting);
    this.pastEvents$ = this.eventStore.getMyEvents(profileId, MyEventsFilterOptions.Past);
  }

  pageSegmentChanged(event) {
    this.currentPageSegment = event.detail.value;
  }

  eventFilterSegmentChanged(event) {
    this.currentEventFilterSegment = event.detail.value;
  }

  navigateBack(): void {
    this.location.back();
  }
}
