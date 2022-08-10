import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { SubSink } from 'subsink';
import { AuthStore } from '../../authentication/auth-store';
import { ProfileService } from '../../profile/profile.service';
import { mockEventData_allEvents, mockEventData_eventById, mockEventData_myEvents, mockEventData_newEvent } from './mock-event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsFeatureService {
  private _fakeEventId = 9;
  private currentUserProfile: Profile
  private subs = new SubSink();

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService,
    private authStore: AuthStore
  ) {
    this.subs.sink = this.authStore.user.pipe(
			switchMap(user => this.profileService.getProfileByUserId(user.Id))
		).subscribe(profile => this.currentUserProfile = profile);
  }

  get fakeEventId() {
    return this._fakeEventId++;
  }

  // TODO: All of these methods should have error handling once we connect to the api.
  getEvents(offset: number, limit: number): Observable<Event[]> {
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

  createEvent(eventRequest: EventRequest): Observable<Event> {
    const response: Event = {
      Id: this.fakeEventId,
      CoverImageUrl: eventRequest.CoverImageData,
      Title: eventRequest.Title,
      Description: eventRequest.Description,
      Creator: {
        Id: this.currentUserProfile.Id,
        IdType: 'Profile',
        DisplayName: this.currentUserProfile.FirstName + this.currentUserProfile.LastName,
        ImageUrl: this.currentUserProfile.ProfilePictureUrl
      },
      Date: eventRequest.Date,
      Location: eventRequest.Location,
      ImageUrls: eventRequest.Images,
      PrivacyLevel: eventRequest.PrivacyLevel,
      Attendees: []
    };

    return of(response);
  }
}
