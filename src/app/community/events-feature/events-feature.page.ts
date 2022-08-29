import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { EventsFeatureStore, MyEventsFilterOptions } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'events-feature',
  templateUrl: './events-feature.page.html',
  styleUrls: ['./events-feature.page.scss']
})
export class EventsFeaturePage implements OnInit {
  myEvents$: Observable<Event[]>;
  allEvents$: Observable<Event[]>;

  constructor(
    private eventsStore: EventsFeatureStore,
    private profileStore: ProfileStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allEvents$ = this.eventsStore.getEvents();
    this.myEvents$ = this.eventsStore.getMyEvents(this.profileStore.currentUserProfile.Id, MyEventsFilterOptions.Attending).pipe(map(events => events.slice(0, 1)));
  }

  createEvent(): void {
    // Creator type is 'Group' when creating an event from a group details page.
    this.router.navigate(
      ['community/events/create'],
      { queryParams: { creatorType: EventCreatorIdType.Profile, creatorId: this.profileStore.currentUserProfile.Id } }
    );
  }
}
