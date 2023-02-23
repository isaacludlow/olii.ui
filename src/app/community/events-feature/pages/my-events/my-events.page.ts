import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';
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
    private route: ActivatedRoute,
    private router: Router,
    private eventStore: EventsFeatureStore,
    private profileStore: ProfileStore
  ) { }

  ngOnInit(): void {
    const profileId = this.profileStore.currentProfile.value.ProfileId;

    this.attendingEvents$ = this.eventStore.getMyAttendingEvents(profileId);
    this.hostingEvents$ = this.eventStore.getMyHostingEvents(profileId);
    this.pastEvents$ = this.eventStore.getMyPastEvents(profileId);

    this.route.queryParamMap.subscribe(paramMap => {
      const eventFilterSegmentToShow = paramMap.get('eventFilterSegmentToShow');

      if (!!eventFilterSegmentToShow) this.currentEventFilterSegment = eventFilterSegmentToShow;
    });
  }

  pageSegmentChanged(event) {
    this.currentPageSegment = event.detail.value;
  }

  eventFilterSegmentChanged(event) {
    this.currentEventFilterSegment = event.detail.value;
  }

  navigateToEventsPage(): void {
    this.router.navigate(['community/events'])
  }
}
