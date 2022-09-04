import { Injectable } from '@angular/core';
import { isAfter, isBefore } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { EventsFeatureService } from './events-feature.service';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureStore {
  allEvents = new BehaviorSubject<Event[]>(null);
  myEvents = new BehaviorSubject<Event[]>(null);
  
  constructor(private eventsService: EventsFeatureService) { }
  
  getEvents(refresh: boolean = false, offset: number = null, limit: number = null): Observable<Event[]> {
    if (this.allEvents.value === null || refresh) {
      return this.eventsService.getEvents(offset, limit).pipe(switchMap(events => {
        this.allEvents.next(events);
        return this.allEvents.asObservable();
      }));
    } else {
      return this.allEvents.asObservable();
    }
  }
  
  getEventById(eventId: number): Observable<Event> {
    if (this.allEvents.value === null) {
      return this.eventsService.getEventById(eventId).pipe(switchMap(event => {
        this.allEvents.next([event]);
        return this.allEvents.asObservable().pipe(map(events => events.find(x => x.EventId === eventId)));
      }));
    } else {
      const event = this.allEvents.pipe(map(events => events.find(event => event.EventId === eventId)));
      
      return event === undefined
      ? this.eventsService.getEventById(eventId).pipe(switchMap(event => {
        this.allEvents.next([...this.allEvents.value, event]);
        return this.allEvents.asObservable().pipe(map(events => events.find(x => x.EventId === eventId)));
      }))
      : event;
    }
  }
  
  getMyEvents(profileId: number, filter: MyEventsFilterOptions): Observable<Event[]> {
    switch (filter) {
      case MyEventsFilterOptions.Attending:
        return this.retrieveMyEvents(profileId).pipe(
          map(events => events.filter(event => isAfter(event.Date, new Date(Date.now()))))
          );
          
          case MyEventsFilterOptions.Hosting:
            return this.retrieveMyEvents(profileId).pipe(
              map(events => events.filter(event => this.isCreator(event, profileId))
          ));
          
          case MyEventsFilterOptions.Past:
            return this.retrieveMyEvents(profileId).pipe(
              map(events => events.filter(event => isBefore(event.Date, new Date(Date.now()))))
              );
              
              case MyEventsFilterOptions.All:
                return this.retrieveMyEvents(profileId);
              }
            }
            
            getGroupEvents(groupId: number, filter: GroupEventsFilterOptions): Observable<Event[]> {
              switch (filter) {
                case GroupEventsFilterOptions.Past:
        return this.retrieveGroupEvents(groupId).pipe(
          map(events => events.filter(event => isBefore(event.Date, new Date(Date.now()))))
          );
          case GroupEventsFilterOptions.Future:
            return this.retrieveGroupEvents(groupId).pipe(
              map(events => events.filter(event => isAfter(event.Date, new Date(Date.now()))))
              );
            }
          }
          
          createEvent(eventRequest: EventRequest): Observable<Event> {
            return this.eventsService.createEvent(eventRequest).pipe(
              tap(event => {
                this.allEvents.next([...this.allEvents.value, event]);
                this.myEvents.next([...this.myEvents.value, event]);
   }));
  }
  
  isAttendingEvent(eventId: number, profileId: number): Observable<boolean> {
    return this.eventsService.isAttendingEvent(eventId, profileId);
  }
  
  rsvpToEvent(profileId: number, eventId: number): Observable<boolean> {
    return this.eventsService.rsvpToEvent(profileId, eventId);
  }

  cancelRsvpToEvent(profileId: number, eventId: number): Observable<boolean> {
    return this.eventsService.cancelRsvpToEvent(profileId, eventId);
  }

  //#region getMyEvents() helper methods.
  private retrieveMyEvents(profileId: number): Observable<Event[]> {
    if (this.myEvents.value === null) {
      return this.eventsService.getMyEvents(profileId).pipe(switchMap(events => {
        this.myEvents.next(events);
        return this.myEvents.asObservable();
      }));
    } else {
      return this.myEvents.asObservable();
    }
  }
  
  private retrieveGroupEvents(groupId: number): Observable<Event[]> {
    return this.eventsService.getEventsByGroupId(groupId);
  }
  
  private isCreator(event: Event, profileId: number): boolean {
    if (event.Creator.IdType !== EventCreatorIdType.Profile) {
      return false;
    } else {
      return event.Creator.Id === profileId;
    }
  }
  //#endregion
}

export enum MyEventsFilterOptions {
  Attending,
  Hosting,
  Past,
  All
}

export enum GroupEventsFilterOptions {
  Past,
  Future,
}