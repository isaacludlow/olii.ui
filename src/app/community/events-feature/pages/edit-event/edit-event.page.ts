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
import { getItemsFromFirstArrayThatAreNotInSecondArray, selectImages } from 'src/app/shared/utilities';
import { SubSink } from 'subsink';
import gm = google.maps;
import { CloudStorageService } from 'src/app/shared/services/bankend/cloud-storage-service/cloud-storage.service';
import { map, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { zip } from 'rxjs';

@Component({
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss']
})
export class EditEventPage implements OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  originalEvent: Event;
  map: google.maps.Map;
  mapMarker: google.maps.Marker = null;
  // Gets a formatted date string to set the min value on ion-datetime
  currentDateTime = format(new Date(), 'yyyy-MM-dd')+'T'+format(new Date(), 'kk:mm:ss');
  eventDateTimeInput: Date;
  eventCoverImage: GalleryPhoto = null;
  eventImages: GalleryPhoto[] = [];
  subs = new SubSink();
  editEventForm = this.fb.group({
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
    privacyLevel: [PrivacyLevelRequest.Public, Validators.required]
  },
  // TODO: Try removing this and adding a check in the html (like on line 28) to only show error messages if a field has been touched.
  { updateOn: 'blur' });
  imagesToDelete: string[] = [];
  imagesToUpload: GalleryPhoto[] = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private eventStore: EventsFeatureStore,
    private storageService: CloudStorageService
  ) { }

  ionViewDidEnter() {
    // TODO-AfterBeta: Refactor to wait until call to get events is done.
    this.createMap();

    this.route.url.pipe(
      map(urlSegments => urlSegments[0].path),
      switchMap(eventId => this.eventStore.getEventById(eventId))
    ).subscribe(event => {
      this.originalEvent = event;
      console.log(event);

      this.editEventForm.get('coverImageUrl').setValue(event.CoverImageUrl);
      this.eventCoverImage = <GalleryPhoto>{ webPath: event.CoverImageUrl };

      this.editEventForm.get('title').setValue(event.Title);
      this.editEventForm.get('description').setValue(event.Description);
      this.editEventForm.get('creator.type').setValue(event.Creator.CreatorType);
      this.editEventForm.get('creator.id').setValue(event.Creator.CreatorId);
      this.editEventForm.get('creator.displayName').setValue(event.Creator.DisplayName);
      this.editEventForm.get('creator.imageUrl').setValue(event.Creator.ImageUrl);

      this.editEventForm.get('dateTime').setValue(event.Date);
      this.eventDateTimeInput = event.Date;

      this.editEventForm.get('location.displayName').setValue(event.Location.DisplayName);
      this.editEventForm.get('location.latitude').setValue(event.Location.Latitude);
      this.editEventForm.get('location.longitude').setValue(event.Location.Longitude);
      this.addMapMarkerAndCenterMap(event.Location.Latitude, event.Location.Longitude);

      this.editEventForm.get('privacyLevel').setValue(event.PrivacyLevel);
      this.eventImages = event.ImageUrls.map(imageUrl => <GalleryPhoto>{ webPath: imageUrl });
    });
  }

  onDateTimeChanged(dateTimeValue: string | string[]) {
    if (Array.isArray(dateTimeValue)) dateTimeValue = dateTimeValue[0];

    this.eventDateTimeInput = new Date(dateTimeValue);
    this.editEventForm.get('dateTime').setValue(dateTimeValue);
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
    this.editEventForm.get('location.displayName').setValue(placeResult.name);
    this.editEventForm.get('location.latitude').setValue(location.lat());
    this.editEventForm.get('location.longitude').setValue(location.lng());
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
      this.editEventForm.get('coverImageUrl').setValue(this.eventCoverImage.webPath);
    });
  }

  removeEventCoverImage(): void {
    this.eventCoverImage = null;
    this.editEventForm.get('coverImageUrl').setValue(this.eventCoverImage.webPath);
  }

  onEventImagesChange(galleryPhotos: GalleryPhoto[]) {
    const deletedImages = getItemsFromFirstArrayThatAreNotInSecondArray(this.originalEvent.ImageUrls, galleryPhotos.map(x => x.webPath));
    if (deletedImages.length > 0) {
      for (const deletedImage of deletedImages) {
        if (this.imagesToDelete.includes(deletedImage))
          continue;
        else 
          this.imagesToDelete.push(...deletedImages);
      }
    }

    const newImages = getItemsFromFirstArrayThatAreNotInSecondArray(galleryPhotos.map(x => x.webPath), this.eventImages.map(x => x.webPath));
    if (newImages.length > 0) {
      for (const newImage of newImages) {
        if (this.imagesToUpload.includes(<GalleryPhoto>{ webPath: newImage}))
          continue;
        else
          this.imagesToUpload.push(<GalleryPhoto>{ webPath: newImage});
      }
    }
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async onSubmit(): Promise<void> {
    const eventId = this.originalEvent.EventId;
    if (this.coverImageHasBeenUpdated(this.originalEvent.CoverImageUrl, this.eventCoverImage.webPath)) {
      const coverImageUrl = await this.eventStore.uploadEventCoverImage(this.eventCoverImage, eventId, this.platform).toPromise();
      this.editEventForm.get('coverImageUrl').setValue(coverImageUrl);
    }

    let updatedImageUrls: string[] = [];

    if (this.imagesToDelete.length > 0) {
      updatedImageUrls.push(...this.originalEvent.ImageUrls.filter(imageUrl => !this.imagesToDelete.includes(imageUrl)));
      await zip(this.imagesToDelete.map(imageUrl => this.storageService.deleteFile(imageUrl))).toPromise();
    }

    if (this.imagesToUpload.length > 0) {
      const newImagesDownloadUrls = await this.eventStore.uploadEventImages(this.imagesToUpload, this.originalEvent.EventId, this.platform).toPromise();
      updatedImageUrls.push(...newImagesDownloadUrls);
    }

    const event = this.createEventRequest(this.editEventForm, updatedImageUrls);

    this.subs.sink = this.eventStore.editEvent(event).subscribe(() => {
      this.editEventForm.reset();
      this.router.navigate(['community/events/my-events'], { queryParams: { eventFilterSegmentToShow: 'hosting' } })
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  private coverImageHasBeenUpdated(originalCoverImage: string, currentCoverImage: string) {
    return originalCoverImage !== currentCoverImage;
  }

  private createEventRequest(form: FormGroup, updatedImageUrls: string[]): Event {
    const eventRequest: Event = {
      EventId: this.originalEvent.EventId,
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
      ImageUrls: updatedImageUrls.length > 0 ? updatedImageUrls : [...this.originalEvent.ImageUrls],
      AttendeesPreview: [],
      TotalAttendees: 0
    };

    return eventRequest;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
