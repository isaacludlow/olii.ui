import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonSlides, Platform } from '@ionic/angular';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { GalleryPhoto } from '@capacitor/camera';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { DomSanitizer } from '@angular/platform-browser';
import gm = google.maps;
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/shared/services/nav-bar/nav-bar.service';
import { calculateBackoffMillis } from '@firebase/util';

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
  profilePicture: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  profileImages: GalleryPhoto[] = [];

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileService: ProfileService,
    private router: Router,
    private navBar: NavBarService,
  ) { }

  ngOnInit() {
    this.registerFlowForm.valueChanges.subscribe(value => console.log(value))
  }

  nextSlide(): void {
    this.slides.slideNext();
  }

  previousSlide(): void {
    this.slides.slidePrev();
  }

  setProfilePicture() {
    selectImages(1).subscribe(galleryPhotos => this.profilePicture = galleryPhotos.shift());
  }

  addProfileImages() {
    let numberOfImagesAllowedToUpload = 9 - this.profileImages.length;
    selectImages(numberOfImagesAllowedToUpload).subscribe(galleryPhotos => this.profileImages.push(...galleryPhotos));
  }

  removeProfileImage(imageIndex: number): void {
    this.profileImages.splice(imageIndex, 1);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  setHostCity(placeResult: gm.places.PlaceResult): void {
    this.registerFlowForm.get('currentCity').setValue(placeResult.vicinity);
  }
  
  setHostCountry(placeResult: gm.places.PlaceResult): void {
    
    this.registerFlowForm.get('hostCountry').setValue(placeResult.formatted_address);
  }
  
  setHomeLocation(placeResult: gm.places.PlaceResult): void {
    this.registerFlowForm.get('homeCountry').setValue(placeResult.formatted_address);
  }

  async submit() {
    const profileData = await this.createProfileRequest();
    const res = this.profileService.createNewProfile(profileData);
    this.navBar.setNavBarVisibility(true);
    this.router.navigate(['community/events'])
  }

  async createProfileRequest() {
    const profileBase64Images = [];
    this.profileImages.forEach(async profileImage => {
      profileBase64Images.push(await readPhotoAsBase64(profileImage, this.platform))
    });

    const profileRequest: ProfileRequest = {
      FirstName: this.registerFlowForm.get('firstName').value,
      LastName: this.registerFlowForm.get('lastName').value,
      HomeCountry: this.registerFlowForm.get('homeCountry').value,
      HostCountry: this.registerFlowForm.get('hostCountry').value,
      CurrentCity: this.registerFlowForm.get('currentCity').value,
      Bio: this.registerFlowForm.get('bio').value,
      ProfilePictureFile: await readPhotoAsBase64(this.profilePicture, this.platform),
      ImageFiles: profileBase64Images,
      Friends: 0,
      ConnectedSocials: [],
      SavedAlbums: []
    };

    return profileRequest
  }
}
