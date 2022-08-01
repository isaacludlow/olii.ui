import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { mockEventData_allEvents, mockEventData_eventById, mockEventData_myEvents, mockEventData_newEvent } from './mock-event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureService {
  constructor(private httpClient: HttpClient) { }

  // TODO: All of these methods should have error handling once we connect to the api.
  getEvents(offset: number = 0, limit: number = null): Observable<Event[]> {
    const response = mockEventData_allEvents;

    return of(response);
  }

  getEventById(eventId: number): Observable<Event> {
    const response = mockEventData_eventById;

    return of(response);
  }

  getMyEvents(profileId: number): Observable<Event[]> {
    const response = mockEventData_myEvents;

    return of(response);
  }

  createEvent(event: EventRequest): Observable<Event> {
    const response = mockEventData_newEvent;

    return of(response);
  }
}
