import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { IonModal, Platform } from '@ionic/angular';
import { format } from 'date-fns';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { EventLocation } from 'src/app/models/dto/misc/event-location.dto';
import { PrivacyLevelRequest } from 'src/app/models/requests/misc/privacy-level-request.do';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';
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
    images: [null]
  },
  { updateOn: 'blur' }
  );
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
      CoverImageData: await readPhotoAsBase64(this.eventCoverImage, this.platform),
      Title: this.createEventForm.get('title').value,
      Description: this.createEventForm.get('description').value,
      Creator: {
        CreatorId: this.createEventForm.get('creator.id').value,
        CreatorType: this.createEventForm.get('creator.type').value as EventCreatorIdType,
        DisplayName: this.createEventForm.get('creator.displayName').value,
        ImageUrl: this.createEventForm.get('creator.imageUrl').value
      },
      Date: new Date(this.createEventForm.get('dateTime').value),
      PrivacyLevel: PrivacyLevelRequest.Public,
      Location: {
        Latitude: this.createEventForm.get('location.latitude').value,
        Longitude: this.createEventForm.get('location.longitude').value,
        DisplayName: this.createEventForm.get('location.displayName').value
      },
      Images: eventBase64Images,
      AttendeeProfile: []
    };

    await this.eventStore.createEvent(eventRequest).toPromise();
    this.createEventForm.reset();
    this.router.navigate(['community/events/my-events'], { queryParams: { eventFilterSegmentToShow: 'hosting' } })
  }
  
  navigateBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
