import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss']
})
export class EventDetailsPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  map: google.maps.Map;
  mapMarker: google.maps.Marker;
  event: Event;
  attendingProfilePictures: string[];
  subs = new SubSink();

  constructor(
    private eventsStore: EventsFeatureStore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this.eventsStore.getEventById(+paramMap.get('eventId')))
    ).subscribe(event => {
      this.event = event;
      this.attendingProfilePictures = this.event.Attendees.map(attendee => attendee.ProfilePictureUrl);
    });
  }

  ionViewDidEnter() {
    // TODO-AfterBeta: Refactor to wait until call to get events is done.
    this.createMap(this.event.Location.Latitude, this.event.Location.Longitude);
  }

  async createMap(latitude: number, longitude: number) {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      zoom: 10,
      center: { lat: latitude, lng: longitude },
      disableDefaultUI: true,
    });

    this.mapMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map
    });
  }

  navigateBack(): void {
    this.router.navigate(['community/events']);
  }
}
