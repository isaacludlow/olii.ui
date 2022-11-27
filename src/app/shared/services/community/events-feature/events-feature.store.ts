import { Injectable } from '@angular/core';
import { isAfter, isBefore, isFuture } from 'date-fns';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { EventData as EventData } from 'src/app/models/requests/community/events/event-data.dto';
import { CloudStorageService } from '../../bankend/cloud-storage-service/cloud-storage.service';
import { DatabaseService } from '../../bankend/database-service/database.service';
import { EventsFeatureService } from './events-feature.service';
import { EventRequest } from 'src/app/models/requests/community/events/event-request.dto';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureStore {
  allEvents = new BehaviorSubject<Event[]>(null);
  myEvents = new BehaviorSubject<Event[]>(null);
  
  constructor(private dbService: DatabaseService, private eventsService: EventsFeatureService, private cloudStorageService: CloudStorageService) { }
  
  getAllEvents(offset: number = null, limit: number = null): Observable<Event[]> {
    if (this.allEvents.value === null) {
      return this.dbService.getAllEvents().pipe(
        switchMap(events => {
          this.allEvents.next(events);
          return this.allEvents.asObservable();
        })
      );
    } else {
      return this.allEvents.asObservable();
    }
  }
  
  getEventById(eventId: string): Observable<Event> {
    const event = this.allEvents.pipe(map(events => events.find(event => event.EventId === eventId)));

    if (event === undefined) {
      return this.dbService.getEventById(eventId).pipe(
        switchMap(event => {
          this.allEvents.next([...this.allEvents.value, event]);
          return this.allEvents.asObservable().pipe(map(events => events.find(x => x.EventId === eventId)));
        })
      );
    } else {
      return event;
    }
  }

  getMyEvents(profileId: string, filter: MyEventsFilterOptions): Observable<Event[]> {
    if (this.myEvents.value === null) {
      return this.dbService.getMyEvents(profileId).pipe(
        switchMap(events => {
          this.myEvents.next(events);
          return this.filterMyEvents(profileId, filter);
        })
      )
    } else {
      return this.filterMyEvents(profileId, filter);
    }
  }
            
  getGroupEvents(groupId: string, filter: GroupEventsFilterOptions): Observable<Event[]> {
    switch (filter) {
      case GroupEventsFilterOptions.Past:
        return this.dbService.getPastGroupEvents(groupId).pipe(
          map(events => events.filter(event => isBefore(event.Date, new Date())))
        );
      case GroupEventsFilterOptions.Future:
        return this.dbService.getPastGroupEvents(groupId).pipe(
          map(events => events.filter(event => isAfter(event.Date, new Date())))
        );
    }
  }

  createEvent(eventData: EventData): Observable<Event> {
    let coverImageUrl: string;
    let eventImagesUrls: string[];

    return this.cloudStorageService.uploadFile(eventData.CoverImageData, `events/cover-images`).pipe(
      switchMap(coverImageUrlRes => coverImageUrlRes.DownloadUrl$),
      tap(downloadUrl => coverImageUrl = downloadUrl),

      switchMap(() => zip(...eventData.ImagesData.map(imageData => this.cloudStorageService.uploadFile(imageData, 'events/images')))),
      switchMap(uploadFileObservableList => zip(...uploadFileObservableList.map(obs => obs.DownloadUrl$))),
      tap(downloadUrlList => eventImagesUrls = downloadUrlList),

      switchMap(() => this.dbService.createEvent(this.createEventRequest(eventData, coverImageUrl, eventImagesUrls)))
    );
  }

  getEventAttendees(eventId: string): Observable<ProfilePreview[]> {
    return this.dbService.getEventAttendees(eventId);
  }
  
  isAttendingEvent(eventId: string, profileId: string): Observable<boolean> {
    return this.eventsService.isAttendingEvent(eventId, profileId);
  }
  
  rsvpToEvent(profileId: string, eventId: string): Observable<boolean> {
    return this.eventsService.rsvpToEvent(profileId, eventId);
  }

  cancelRsvpToEvent(profileId: string, eventId: string): Observable<boolean> {
    return this.eventsService.cancelRsvpToEvent(profileId, eventId);
  }

  //#region getMyEvents() helper methods.
  private filterMyEvents(profileId: string, filter: MyEventsFilterOptions) {
    switch (filter) {
      case MyEventsFilterOptions.Attending:
        return this.myEvents.asObservable().pipe(
          map(events => events.filter(event => isFuture(event.Date)))
        );

      case MyEventsFilterOptions.Hosting:
        return this.myEvents.asObservable().pipe(
          map(events => events.filter(event => this.isCreator(event, profileId))
        ));

      case MyEventsFilterOptions.Past:
        return this.myEvents.asObservable().pipe(
          map(events => events.filter(event => isBefore(event.Date, new Date(Date.now()))))
        );

      case MyEventsFilterOptions.All:
        return this.myEvents.asObservable();
    }
  }

  private createEventRequest(eventData: EventData, coverImageUrl: string, eventImagesUrls: string[]): EventRequest {
    const event: EventRequest = {
      CoverImageUrl: coverImageUrl,
      Title: eventData.Title,
      Description: eventData.Description,
      Creator: eventData.Creator,
      Date: eventData.Date,
      PrivacyLevel: eventData.PrivacyLevel,
      Location: eventData.Location,
      ImagesUrls: eventImagesUrls,
      AttendeesPreview: eventData.AttendeesPreview
    };

    return event;
  }

  private retrieveGroupEvents(groupId: string): Observable<Event[]> {
    return this.eventsService.getEventsByGroupId(groupId);
  }
  
  private isCreator(event: Event, profileId: string): boolean {
    if (event.Creator.CreatorType !== EventCreatorIdType.Profile) {
      return false;
    } else {
      return event.Creator.CreatorId === profileId;
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