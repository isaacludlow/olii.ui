import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { observable, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventData } from 'src/app/models/requests/community/events/event-data.dto';
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
    getAllEvents(offset: number, limit: number): Observable<Event[]> {
      let params = new HttpParams();

      if (offset !== null) params = params.set('offset', offset);
      if (limit !== null) params = params.set('limit', limit);
    
    const response = this.httpClient.get<Event[]>(`/all-events`, {
      params: params,
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  getEventById(eventId: number): Observable<Event> {
    const response = this.httpClient.get<Event>(`/event/${eventId}`, {
    }).pipe(tap(event => event.Date = parseISO(<any>event.Date)));
    
    return response;
  }

  getEventsAttending(profileId: number) {
    const response = this.httpClient.get<Event[]>(`/eventsAttending`, {
      params: { profileId: profileId },
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  getMyEvents(profileId: number): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`/event`, {
      params: { profileId: profileId },
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  getEventsByGroupId(groupId: string): Observable<Event[]> {
    const response = this.httpClient.get<Event[]>(`/event`, {
      params: { groupId: groupId },
    }).pipe(tap(events => events.forEach(event => event.Date = parseISO(<any>event.Date))));
    
    return response;
  }
  
  createEvent(eventRequest: EventData): Observable<Event> {
    const response = this.httpClient.post<Event>(`/event`, eventRequest, {
    }).pipe(tap(event => event.Date = parseISO(<any>event.Date)));
    
    return response;
  }
  
  isAttendingEvent(eventId: string, profileId: string): Observable<boolean> {
    const response = this.httpClient.get<boolean>(`/event/${eventId}/attendee/${profileId}`, {
    });
    
    return response;
  }
  
  rsvpToEvent(profileId: string, eventId: string): Observable<boolean> {
    const response = this.httpClient.post<string>(`/event/${eventId}/attendee/${profileId}`, {}, {
      observe: 'response'
    }).pipe(map(res => res.ok));

    return response;
  }

  cancelRsvpToEvent(profileId: string, eventId: string): Observable<boolean> {
    const response = this.httpClient.delete<string>(`/event/${eventId}/attendee/${profileId}`, {
      observe: 'response'
    }).pipe(map(res => res.ok));

    return response;
  }
}
