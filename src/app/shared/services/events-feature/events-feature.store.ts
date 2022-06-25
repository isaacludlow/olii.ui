import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureService } from './events-feature.service';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureStore {
    allEvents = new BehaviorSubject(null);
    myEvents = new BehaviorSubject(null);

  constructor(private eventsService: EventsFeatureService) { }

  getEvents(offset: number = 0, limit: number = null): Observable<Event[]> {
    return this.eventsService.getEvents(offset, limit).pipe(tap(events => this.allEvents.next(events)));
  }

  getMyEvents(profileId: number) {
    return this.eventsService.getMyEvents(profileId).pipe(tap(events => this.myEvents.next(events)));
  }
}