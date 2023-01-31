import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { IonModal, Platform } from '@ionic/angular';
import { format } from 'date-fns';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { PrivacyLevelRequest } from 'src/app/models/requests/misc/privacy-level-request.do';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { SubSink } from 'subsink';
import gm = google.maps;
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { DatabaseService } from 'src/app/shared/services/bankend/database-service/database.service';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { selectImages } from 'src/app/shared/utilities';

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
  currentDateTime = format(new Date(), 'yyyy-MM-dd') + 'T' + format(new Date(), 'kk:mm:ss');
  eventDateTimeInput: Date;
  eventCoverImage: GalleryPhoto = null;
  eventImages: GalleryPhoto[] = [];
  createEventForm = this.fb.group({
    coverImageUrl: [null, Validators.required],
    title: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(8)]],
    creator: this.fb.group({
      type: [null, Validators.required],
      id: [null, Validators.required],
      displayName: [null, Validators.required],
      imageUrl: [null, Validators.required]
    }),
    dateTime: [null, Validators.required],
    location: this.fb.group({
      displayName: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    }),
    privacyLevel: [PrivacyLevelRequest.Public, Validators.required],
    imageUrls: [[]]
  });
  loadingButton: boolean;
  subs = new SubSink();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private eventStore: EventsFeatureStore,
    private dbService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.queryParamMap.subscribe(paramMap => {
      this.createEventForm.get('creator.type').setValue(paramMap.get('creatorType'));
      this.createEventForm.get('creator.id').setValue(paramMap.get('creatorId'));
      this.createEventForm.get('creator.displayName').setValue(paramMap.get('creatorDisplayName'));
      this.createEventForm.get('creator.imageUrl').setValue(paramMap.get('imageUrl'));
    });
  }

  ionViewDidEnter() {
    // TODO-AfterBeta: Refactor to wait until call to get events is done.
    this.createMap();
  }

  onDateTimeChanged(dateTimeValue: string | string[]) {
    if (Array.isArray(dateTimeValue)) dateTimeValue = dateTimeValue[0];

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
    this.createEventForm.get('location.displayName').setValue(placeResult.name);
    this.createEventForm.get('location.latitude').setValue(location.lat());
    this.createEventForm.get('location.longitude').setValue(location.lng());
  }

  addMapMarkerAndCenterMap(latitude: number, longitude: number) {
    if (this.mapMarker === null) {
      this.mapMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map
      });
    } else {
      this.mapMarker.setPosition({ lat: latitude, lng: longitude });
    }

    this.map.setCenter({ lat: latitude, lng: longitude });
    this.map.setZoom(10);
  }

  setEventCoverImage() {
    this.subs.sink = selectImages(1).subscribe(galleryPhotos => {
      this.eventCoverImage = galleryPhotos[0];
      // TODO: Refactor this and removeEventCoverImage() so we're not setting the url as the webPath to the uploaded image.
      // You should also remove the images from the form since they're not actual fields in the form.
      this.createEventForm.get('coverImageUrl').setValue(this.eventCoverImage);
    });
  }

  removeEventCoverImage(): void {
    this.eventCoverImage = null;
    this.createEventForm.get('coverImageUrl').setValue(null);
  }

  setEventImages() {
    let numberOfImagesAllowedToUpload = 9 - this.eventImages.length;
    this.subs.sink = selectImages(numberOfImagesAllowedToUpload).subscribe(galleryPhotos => {
      this.eventImages.push(...galleryPhotos);
      this.createEventForm.get('imageUrls').setValue(this.eventImages);
    });
  }

  removeEventImage(imageIndex: number): void {
    this.eventImages.splice(imageIndex, 1);
    this.createEventForm.get('imageUrls').setValue(this.eventImages);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async onSubmit(): Promise<void> {
    this.loadingButton = true;
    const newEventId = this.dbService.generateDocumentId();
    const coverImageUrl = await this.eventStore.uploadEventCoverImage(this.eventCoverImage, newEventId, this.platform).toPromise();
    this.createEventForm.get('coverImageUrl').setValue(coverImageUrl);

    if (this.eventImages.length > 0) {
      const imageUrls = await this.eventStore.uploadEventImages(this.eventImages, newEventId, this.platform).toPromise();
      this.createEventForm.get('imageUrls').setValue(imageUrls);
    }

    const event = this.createEventRequest(this.createEventForm, newEventId);

    this.subs.sink = this.eventStore.createEvent(event).subscribe(() => {
      this.createEventForm.reset();
      this.loadingButton = false;
      this.location.back();
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private createEventRequest(form: FormGroup, newEventId: string): Event {
    const eventRequest: Event = {
      EventId: newEventId,
      CoverImageUrl: form.get('coverImageUrl').value,
      Title: form.get('title').value,
      Description: form.get('description').value,
      Creator: {
        CreatorId: form.get('creator.id').value,
        CreatorType: form.get('creator.type').value as EventCreatorIdType,
        DisplayName: form.get('creator.displayName').value,
        ImageUrl: form.get('creator.imageUrl').value
      },
      Date: new Date(form.get('dateTime').value),
      PrivacyLevel: form.get('privacyLevel').value as PrivacyLevel,
      Location: {
        Latitude: form.get('location.latitude').value,
        Longitude: form.get('location.longitude').value,
        DisplayName: form.get('location.displayName').value
      },
      ImageUrls: form.get('imageUrls').value,
      AttendeesPreview: [],
      TotalAttendees: 0
    };

    return eventRequest;
  }
}
