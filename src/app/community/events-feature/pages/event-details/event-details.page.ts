import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { FullscreenImageViewerComponent } from 'src/app/components/shared/fullscreen-image-viewer/fullscreen-image-viewer.component';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss']
})
export class EventDetailsPage implements OnInit, OnDestroy {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  map: google.maps.Map;
  mapMarker: google.maps.Marker;
  event: Event;
  attendingProfilePictures: string[];
  attending: boolean;
  currentProfile: Profile;
  subs = new SubSink();

  constructor(
    private eventsStore: EventsFeatureStore,
    private route: ActivatedRoute,
    private profileStore: ProfileStore,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    // TODO: Need to change this to wait for the currentProfile to come back from the db on reload.
    this.currentProfile = this.profileStore.currentProfile.value;

    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this.eventsStore.getEventById(paramMap.get('eventId')))
    ).subscribe(event => {
      this.event = event;
      this.attendingProfilePictures = this.event.AttendeesPreview.map(attendee => attendee.ProfilePictureUrl);
    });

    this.subs.sink = this.eventsStore.isAttendingEvent(this.event.EventId, this.currentProfile.ProfileId)
      .subscribe(isAttending => this.attending = isAttending);
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

  rsvpToEvent() {
    const profilePreview: ProfilePreview = {
      ProfileId: this.currentProfile.ProfileId,
      FirstName: this.currentProfile.FirstName,
      LastName: this.currentProfile.LastName,
      ProfilePictureUrl: this.currentProfile.ProfilePictureUrl
    };
    
    this.subs.sink = this.eventsStore.rsvpToEvent(profilePreview, this.event.EventId).subscribe(() => this.attending = true);
  }

  cancelRsvpToEvent() {
    this.subs.sink = this.eventsStore.cancelRsvpToEvent(this.currentProfile.ProfileId, this.event.EventId).subscribe(() => this.attending = false);
  }

  async openImageViewer(imageIndex: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: FullscreenImageViewerComponent,
      componentProps: {
        imageUrls: this.event.ImageUrls,
        startingIndex: imageIndex
      }
    });

    modal.present();
  }

  navigateBack(): void {
    this.router.navigate(['community/events']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
