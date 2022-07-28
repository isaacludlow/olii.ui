import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryPhoto } from '@capacitor/camera';
import { IonModal } from '@ionic/angular';
import { EventLocation } from 'src/app/models/dto/misc/event-location.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { selectImages } from 'src/app/shared/utilities';
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

  eventDateTimeInput: Date;
  eventCoverImage: GalleryPhoto = null;
  eventImages: GalleryPhoto[] = [];
  createEventForm = this.fb.group({
    coverImage: [null, Validators.required],
    title: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(5)]],
    dateTime: [null, Validators.required],
    location: [null, Validators.required],
    // privacyLevel: [null, Validators.required],
    images: [null]
  });
  subs = new SubSink();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.createEventForm.valueChanges.subscribe(v => console.log(v))
  }

  ionViewDidEnter() {
    // TODO: Refactor to wait until call to get events is done.
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

  }
  
  navigateBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
