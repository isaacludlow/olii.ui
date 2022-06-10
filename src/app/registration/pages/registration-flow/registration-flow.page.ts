import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import gm = google.maps;

@Component({
  templateUrl: './registration-flow.page.html',
  styleUrls: ['./registration-flow.page.scss']
})
export class RegistrationFlowPage {
  @ViewChild('slider') slides: IonSlides;
  slideOptions = { initialSlide: 0, speed: 400, allowTouchMove: false };
  registerFlowForm = this.fb.group({
    firstName: [null],
    lastName: [null],
    currentCity: [null],
    hostCountry: [null],
    homeCountry: [null],
    bio: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerFlowForm.valueChanges.subscribe(formState => console.log(formState))
  }

  nextSlide(): void {
    this.slides.slideNext();
  }

  previousSlide(): void {
    this.slides.slidePrev();
  }

  setHostLocation(placeResult: gm.places.PlaceResult): void {
    const placeDetails = placeResult.name.split(', ');
    this.registerFlowForm.get('currentCity').setValue(placeDetails.shift());
    this.registerFlowForm.get('hostCountry').setValue(placeDetails.pop());
  }
  
  setHomeLocation(placeResult: gm.places.PlaceResult): void {
    this.registerFlowForm.get('homeCountry').setValue(placeResult.name);
  }

  submit() {
    const profileRequest = this.createProfileRequest();
  }

  createProfileRequest() {
    const profileRequest: ProfileRequest = {
      FirstName: this.registerFlowForm.get('firstName').value,
      LastName: this.registerFlowForm.get('lastName').value,
      HomeCountry: this.registerFlowForm.get('homeCountry').value,
      HostCountry: this.registerFlowForm.get('hostCountry').value,
      CurrentCity: this.registerFlowForm.get('currentCity').value,
      Bio: this.registerFlowForm.get('bio').value,
      ProfilePictureFile: '',
      ImageFiles: [],
      Connections: 0,
      ConnectedSocials: [],
      SavedAlbums: []
    };

    return profileRequest
  }
}
