import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore } from 'src/app/shared/services/events-feature/events-feature.store';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss']
})
export class EventDetailsPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  map: GoogleMap
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
  
  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'event-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      // forceCreate: true,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    });
  }

  navigateBack(): void {
    this.location.back();
  }
}
