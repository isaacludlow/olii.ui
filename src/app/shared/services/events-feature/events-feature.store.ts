import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { PartialProfile } from 'src/app/models/dto/profile/partial-profile.dto';
import { EventsFeatureService } from './events-feature.service';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureStore {
  allEvents = new BehaviorSubject<Event[]>(null);
  myEvents = new BehaviorSubject<Event[]>(null);

  constructor(private eventsService: EventsFeatureService) { }

  getEvents(offset: number = 0, limit: number = null): Observable<Event[]> {
    return this.eventsService.getEvents(offset, limit).pipe(tap(events => this.allEvents.next(events)));
  }

  getEventById(eventId: number) {
    if (this.allEvents.value === null) {
      return this.eventsService.getEventById(eventId).pipe(tap(event => this.allEvents.next([event])));
    } else {
      const event = this.allEvents.asObservable().pipe(map(events => events.find(event => event.Id === eventId)));

      return event === undefined
        ? this.eventsService.getEventById(eventId).pipe(tap(event => this.allEvents.value.push(event)))
        : event;
    }
  }

  getMyEvents(profileId: number) {
    return this.eventsService.getMyEvents(profileId).pipe(tap(events => this.myEvents.next(events)));
  }
}