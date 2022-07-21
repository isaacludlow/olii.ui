import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { EventLocation } from 'src/app/models/dto/misc/event-location.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import gm = google.maps;

@Component({
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss']
})
export class CreateEventPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('map') mapRef: ElementRef<HTMLElement>
  map: google.maps.Map;
  mapMarker: google.maps.Marker = null;
  event: EventRequest;
  createEventForm = this.fb.group({
    coverImage: [Validators.required, Validators.minLength(5)],
    title: [null, Validators.required],
    description: [null, [Validators.required, Validators.minLength(50)]],
    dateTime: [null, Validators.required],
    location: [null, Validators.required],
    privacyLevel: [null]
  });

  constructor(private location: Location, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    // TODO: Refactor to wait until call to get events is done.
    this.createMap();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('blank', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
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

  navigateBack(): void {
    this.location.back();
  }
}
