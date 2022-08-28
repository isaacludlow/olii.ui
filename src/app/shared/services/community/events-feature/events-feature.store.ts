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
  private _allEvents = new BehaviorSubject<Event[]>(null);
  private _myEvents = new BehaviorSubject<Event[]>(null);

  constructor(private eventsService: EventsFeatureService) { }

  getEvents(refresh: boolean = false, offset: number = null, limit: number = null): Observable<Event[]> {
    if (this._allEvents.value === null || refresh) {
      return this.eventsService.getEvents(offset, limit).pipe(switchMap(events => {
        this._allEvents.next(events);
        return this._allEvents.asObservable();
      }));
    } else {
      return this._allEvents.asObservable();
    }
  }

  getEventById(eventId: number): Observable<Event> {
    if (this._allEvents.value === null) {
      return this.eventsService.getEventById(eventId).pipe(tap(event => this._allEvents.next([event])));
    } else {
      const event = this._allEvents.pipe(map(events => events.find(event => event.EventId === eventId)));

      return event === undefined
        ? this.eventsService.getEventById(eventId).pipe(tap(event => this._allEvents.next([...this._allEvents.value, event])))
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
        this._allEvents.next([...this._allEvents.value, event]);
        this._myEvents.next([...this._myEvents.value, event]);
      })
    );
  }

  //#region getMyEvents() helper methods.
  private retrieveMyEvents(profileId: number): Observable<Event[]> {
    if (this._myEvents.value === null) {
      return this.eventsService.getMyEvents(profileId).pipe(switchMap(events => {
        this._myEvents.next(events);
        return this._myEvents.asObservable();
      }));
    } else {
      return this._myEvents.asObservable();
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