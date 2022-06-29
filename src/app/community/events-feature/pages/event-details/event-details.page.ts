import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore } from 'src/app/shared/services/events-feature/events-feature.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss']
})
export class EventDetailsPage implements OnInit {
  event: Event;
  // eventCreator: PartialProfile;
  attendingProfilePictures: string[];
  subs = new SubSink();

  constructor(
    private eventsStore: EventsFeatureStore,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this.eventsStore.getEventById(+paramMap.get('eventId')))
    ).subscribe(event => {
      this.event = event;
      // this.subs.sink = this.eventsStore.getEventCreatorInfo(event.CreatorType, event.CreatorId).pipe(
      //   tap(eventCreator => this.eventCreator = eventCreator)
      // );

      this.attendingProfilePictures = this.event.Attendees.map(attendee => attendee.ProfilePictureUrl);
    });

  }

  navigateBack(): void {
    this.location.back();
  }
}
