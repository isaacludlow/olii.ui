import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { mockEventData_allEvents, mockEventData_myEvents } from './mock-event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureService {

  constructor() { }

  getEvents(offset: number = 0, limit: number = null): Observable<Event[]> {
    const response = mockEventData_allEvents;

    return of(response);
  }

  getMyEvents(profileId: number): Observable<Event[]> {
    const response = mockEventData_myEvents;

    return of(response);
  }
}
