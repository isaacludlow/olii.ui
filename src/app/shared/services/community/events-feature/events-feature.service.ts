import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { observable, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
      let params = new HttpParams();

      if (offset !== null) params = params.set('offset', offset);
      if (limit !== null) params = params.set('limit', limit);
    
    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/all-events`, {
      params: params,
      headers: { Authorization: this.authStore.userIdToken }
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  getEventById(eventId: number): Observable<Event> {
    const response = this.httpClient.get<Event>(`${environment.apiBaseUrl}/event/${eventId}`, {
      headers: { Authorization: this.authStore.userIdToken }
    }).pipe(tap(event => event.Date = parseISO(<any>event.Date)));
    
    return response;
  }
  
  getMyEvents(profileId: number): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/event`, {
      params: { profileId: profileId },
      headers: { Authorization: this.authStore.userIdToken }
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  getEventsByGroupId(groupId: number): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`${environment.apiBaseUrl}/event`, {
      params: { profileId: groupId },
      headers: { Authorization: this.authStore.userIdToken }
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  createEvent(eventRequest: EventRequest): Observable<Event> {
    const response = this.httpClient.post<Event>(`${environment.apiBaseUrl}/event`, eventRequest, {
      headers: { Authorization: this.authStore.userIdToken }
    }).pipe(tap(event => event.Date = parseISO(<any>event.Date)));
    
    return response;
  }
  
  isAttendingEvent(eventId: number, profileId): Observable<boolean> {
    const response = this.httpClient.get<boolean>(`${environment.apiBaseUrl}/event/${eventId}/attendee/${profileId}`, {
      headers: { Authorization: this.authStore.userIdToken }
    });
    
    return response;
  }
  
  rsvpToEvent(profileId: number, eventId: number): Observable<boolean> {
    const response = this.httpClient.post<string>(`${environment.apiBaseUrl}/event/${eventId}/attendee/${profileId}`, {}, {
      headers: { Authorization: this.authStore.userIdToken },
      observe: 'response'
    }).pipe(map(res => res.ok));

    return response;
  }

  cancelRsvpToEvent(profileId: number, eventId: number): Observable<boolean> {
    const response = this.httpClient.delete<string>(`${environment.apiBaseUrl}/event/${eventId}/attendee/${profileId}`, {
      headers: { Authorization: this.authStore.userIdToken },
      observe: 'response'
    }).pipe(map(res => res.ok));

    return response;
  }
}
