import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { environment } from 'src/environments/environment';
import { AuthStore } from '../../authentication/auth-store';
import { mockEventData_allEvents, mockEventData_eventById, mockEventData_myEvents } from './mock-event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureService {
  constructor(
    private httpClient: HttpClient,
    private authStore: AuthStore
  ) { }

  // TODO: All of these methods should have error handling once we connect to the api.
  getEvents(offset: number, limit: number): Observable<Event[]> {
    const getEventParams = new HttpParams();

    if (offset !== null) getEventParams.set('offset', offset);
    if (limit !== null) getEventParams.set('limit', limit);

    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/all-events`, {
      params: getEventParams,
      headers: { Authorization: this.authStore.userIdToken }
    });

    return response;
  }

  getEventById(eventId: number): Observable<Event> {
    const response = this.httpClient.get<Event>(`${environment.apiBaseUrl}/event/${eventId}`, { headers: { Authorization: this.authStore.userIdToken } });

    return response;
  }

  getMyEvents(profileId: number): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/event`, {
      params: { profileId: profileId },
      headers: { Authorization: this.authStore.userIdToken }
    });

    return response;
  }

  getEventsByGroupId(groupId: number): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/event`, {
      params: { profileId: groupId },
      headers: { Authorization: this.authStore.userIdToken }
    });

    return response;
  }

  createEvent(eventRequest: EventRequest): Observable<Event> {
    const response = this.httpClient.post<Event>(
      `${environment.apiBaseUrl}/event`,
      eventRequest,
      { headers: { Authorization: this.authStore.userIdToken } }
    );

    return response;
  }
}
