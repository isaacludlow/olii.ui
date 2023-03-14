import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, of, zip } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { CloudStorageService } from '../../bankend/cloud-storage-service/cloud-storage.service';
import { DatabaseService } from '../../bankend/database-service/database.service';
import { GalleryPhoto } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { readPhotoAsBase64 } from 'src/app/shared/utilities';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureStore {
  private _allEvents: Observable<Event[]>;
  private _myAttendingEvents: Observable<Event[]>;
  private _myHostingEvents: Observable<Event[]>;
  private _myPastEvents: Observable<Event[]>;

  constructor(
    private dbService: DatabaseService,
    private cloudStorageService: CloudStorageService
  ) { }
  
  getAllEvents(offset: number = null, limit: number = null): Observable<Event[]> {
    this._allEvents = this.dbService.getAllEvents().pipe(
      startWith([]),
      shareReplay(1)
    );

    return this._allEvents;
  }

  getEventById(eventId: string): Observable<Event> {
    let eventObservables = [this._allEvents, this._myAttendingEvents, this._myHostingEvents, this._myPastEvents];
    eventObservables = eventObservables.filter(eventObservable => eventObservable != null);

    let event = combineLatest(eventObservables).pipe(
      map(events => events.flat().find(event => event.EventId === eventId))
    );

    return event.pipe(
      switchMap(detailsPageEvent => {
        if (!detailsPageEvent){
          return this.dbService.getEventById(eventId);
        } else {
          return of(detailsPageEvent);
        }
      })
    );
  }

  getMyAttendingEvents(profileId: string): Observable<Event[]> {
    this._myAttendingEvents = this.dbService.getMyAttendingEvents(profileId).pipe(
      startWith([]),
      shareReplay(1)
    );

    return this._myAttendingEvents;
  }

  getMyHostingEvents(profileId: string): Observable<Event[]> {
    this._myHostingEvents = this.dbService.getMyHostingEvents(profileId).pipe(
      startWith([]),
      shareReplay(1)
    );

    return this._myHostingEvents;
  }

  getMyPastEvents(profileId: string): Observable<Event[]> {
    this._myPastEvents = this.dbService.getMyPastEvents(profileId).pipe(
      startWith([]),
      shareReplay(1)
    );

    return this._myPastEvents;
  }
            
  getGroupEvents(groupId: string, filter: GroupEventsFilterOptions): Observable<Event[]> {
    switch (filter) {
      case GroupEventsFilterOptions.Past:
        return this.dbService.getPastGroupEvents(groupId).pipe(startWith([]));
      case GroupEventsFilterOptions.Upcoming:
        return this.dbService.getUpcomingGroupEvents(groupId).pipe(startWith([]));
    }
  }

  createEvent(event: Event): Observable<void> {
    return this.dbService.createEvent(event);
  }

  editEvent(event: Event): Observable<void> {
    return this.dbService.editEvent(event);
  }

  getEventAttendees(eventId: string): Observable<ProfilePreview[]> {
    return this.dbService.getEventAttendees(eventId);
  }
  
  isAttendingEvent(eventId: string, profileId: string): Observable<boolean> {
    return this.dbService.isAttendingEvent(eventId, profileId);
  }
  
  rsvpToEvent(profilePreview: ProfilePreview, eventId: string): Observable<void> {
    return this.dbService.rsvpToEvent(profilePreview, eventId);
  }

  cancelRsvpToEvent(profileId: string, eventId: string): Observable<void> {
    return this.dbService.cancelRsvpToEvent(profileId, eventId);
  }

  uploadEventCoverImage(coverImage: GalleryPhoto, eventId: string, platform: Platform): Observable<string> {
    return from(readPhotoAsBase64(coverImage, platform)).pipe(
      switchMap(imageData => this.cloudStorageService.uploadFile(imageData, `events/${eventId}/cover-image`)),
      switchMap(uploadFileObservable => uploadFileObservable.DownloadUrl$)
    );
  }

  uploadEventImages(images: GalleryPhoto[], eventId: string, platform: Platform): Observable<string[]> {
    const base64ImageObservables = images.map(image => from(readPhotoAsBase64(image, platform)));

    const downloadUrls$ = zip(...base64ImageObservables).pipe(
      switchMap(base64Images =>
        zip(...base64Images.map(imageData => this.cloudStorageService.uploadFile(imageData, `events/${eventId}/images/${uuidv4()}`)))
      ),
      switchMap(uploadFileObservables => zip(...uploadFileObservables.map(x => x.DownloadUrl$)))
    );

    return downloadUrls$;
  }
}

export enum GroupEventsFilterOptions {
  Past,
  Upcoming,
}