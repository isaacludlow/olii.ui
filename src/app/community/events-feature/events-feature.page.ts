import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore, MyEventsFilterOptions } from 'src/app/shared/services/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'events-feature',
  templateUrl: './events-feature.page.html',
  styleUrls: ['./events-feature.page.scss']
})
export class EventsFeaturePage implements OnInit {
  myEvents$: Observable<Event[]>;
  allEvents$: Observable<Event[]>;

  constructor(private eventsStore: EventsFeatureStore, private profileStore: ProfileStore) { }

  async ngOnInit(): Promise<void> {
    this.allEvents$ = this.eventsStore.getEvents();
    this.myEvents$ = this.eventsStore.getMyEvents(this.profileStore.currentUserProfile.Id, MyEventsFilterOptions.Attending).pipe(map(events => events.slice(0, 1)));
  }
}
