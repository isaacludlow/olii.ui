import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore } from 'src/app/shared/services/events-feature/events-feature.store';

@Component({
  selector: 'events-feature',
  templateUrl: './events-feature.page.html',
  styleUrls: ['./events-feature.page.scss']
})
export class EventsFeaturePage implements OnInit {
  myEvents$: Observable<Event[]>;
  allEvents$: Observable<Event[]>;

  constructor(private eventsStore: EventsFeatureStore) { }

  async ngOnInit(): Promise<void> {
    this.allEvents$ = this.eventsStore.getEvents();
    this.myEvents$ = this.eventsStore.getMyEvents(98).pipe(map(events => events.slice(0, 1)));
  }
}
