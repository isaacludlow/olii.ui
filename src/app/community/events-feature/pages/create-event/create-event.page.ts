import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { IonModal, Platform } from '@ionic/angular';
import { format } from 'date-fns';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { EventLocation } from 'src/app/models/dto/misc/event-location.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { EventsFeatureStore } from 'src/app/shared/services/events-feature/events-feature.store';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { SubSink } from 'subsink';
import gm = google.maps;

@Component({
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss']
})
export class CreateEventPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  map: google.maps.Map;
  mapMarker: google.maps.Marker = null;
  // Gets a formatted date string to set the min value on ion-datetime
  currentDateTime = format(new Date(), 'yyyy-MM-dd')+'T'+format(new Date(), 'kk:mm:ss');
  eventDateTimeInput: Date;
  eventCoverImage: GalleryPhoto = null;
  eventImages: GalleryPhoto[] = [];
  createEventForm = this.fb.group({
    coverImage: [null, Validators.required],
    title: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(5)]],
    creatorType: [null, Validators.required],
    creatorId: [null, Validators.required],
    dateTime: [null, Validators.required],
    location: [null, Validators.required],
    // privacyLevel: [null, Validators.required],
    images: [null]
  });
  subs = new SubSink();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private eventStore: EventsFeatureStore
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      this.createEventForm.get('creatorType').setValue(paramMap.get('creatorType'));
      this.createEventForm.get('creatorId').setValue(paramMap.get('creatorId'));
    });
  }

  ionViewDidEnter() {
    // TODO-AfterBeta: Refactor to wait until call to get events is done.
    this.createMap();
  }

  onDateTimeChanged(dateTimeValue: string) {
    this.eventDateTimeInput = new Date(dateTimeValue);
    this.createEventForm.get('dateTime').setValue(dateTimeValue);
  }


  async createMap() {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      zoom: 0,
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
    });
  }

  setEventLocation(placeResult: gm.places.PlaceResult): void {
    const location = placeResult.geometry.location;
    
    this.addMapMarkerAndCenterMap(location.lat(), location.lng());
    this.createEventForm.get('location').setValue(
      <EventLocation>{
        DisplayName: placeResult.name,
        Latitude: location.lat(),
        Longitude: location.lng()
      }
    );
  }
  
  addMapMarkerAndCenterMap(latitude: number, longitude: number) {
    if (this.mapMarker === null) {
      this.mapMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map
      });
    } else {
      this.mapMarker.setPosition({lat: latitude, lng: longitude});
    }
    
    this.map.setCenter({lat: latitude, lng: longitude});
    this.map.setZoom(10);
  }

  setEventCoverImage() {
    this.subs.sink = selectImages(1).subscribe(galleryPhotos => {
      this.eventCoverImage = galleryPhotos[0];
      this.createEventForm.get('coverImage').setValue(this.eventCoverImage);
    });
  }

  removeEventCoverImage(): void {
    this.eventCoverImage = null;
    this.createEventForm.get('coverImage').setValue(this.eventCoverImage);
  }

  setEventImages() {
    let numberOfImagesAllowedToUpload = 9 - this.eventImages.length;
    this.subs.sink = selectImages(numberOfImagesAllowedToUpload).subscribe(galleryPhotos => {
      this.eventImages.push(...galleryPhotos);
      this.createEventForm.get('images').setValue(this.eventImages);
    });
  }

  removeEventImage(imageIndex: number): void {
    this.eventImages.splice(imageIndex, 1);
    this.createEventForm.get('images').setValue(this.eventImages);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async onSubmit(): Promise<void> {
    const eventBase64Images = [];
    this.eventImages.forEach(async image => {
      eventBase64Images.push(await readPhotoAsBase64(image, this.platform))
    });

    const eventRequest: EventRequest = {
      CoverImage: await readPhotoAsBase64(this.eventCoverImage, this.platform),
      Title: this.createEventForm.get('title').value,
      Description: this.createEventForm.get('description').value,
      CreatorType: this.createEventForm.get('creatorType').value as EventCreatorIdType,
      CreatorId: this.createEventForm.get('creatorId').value as number,
      Date: new Date(this.createEventForm.get('dateTime').value),
      PrivacyLevel: 'Public',
      Location: this.createEventForm.get('location').value as EventLocation,
      Images: eventBase64Images
    };

    this.eventStore.createEvent(eventRequest).subscribe();
    this.router.navigate(['community/events/my-events'], { queryParams: { eventFilterSegmentToShow: 'hosting' } })
  }
  
  navigateBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
