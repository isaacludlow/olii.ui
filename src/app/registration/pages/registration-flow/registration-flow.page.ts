import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonSlides, Platform } from '@ionic/angular';
import { GalleryPhoto } from '@capacitor/camera';
import { selectImages } from 'src/app/shared/utilities';
import { DomSanitizer } from '@angular/platform-browser';
import gm = google.maps;
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/shared/services/nav-bar/nav-bar.service';
import { SubSink } from 'subsink';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { UserStore } from 'src/app/shared/services/user/user.store';
import { Profile } from 'src/app/models/dto/profile/profile.dto';

@Component({
  templateUrl: './registration-flow.page.html',
  styleUrls: ['./registration-flow.page.scss']
})
export class RegistrationFlowPage implements OnDestroy {
  @ViewChild('slider') slides: IonSlides;
  slideOptions = { initialSlide: 0, speed: 400, allowTouchMove: false };
  registerFlowForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    currentCity: [''],
    hostCountry: [''],
    homeCountry: [''],
    bio: ['']
  });
  profilePicture: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  profileImages: GalleryPhoto[] = [];
  subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore,
    private userStore: UserStore,
    private router: Router,
    private navBar: NavBarService,
  ) {}

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
    const profileRequest = await this.createProfileRequest();
    this.subs.sink = this.profileStore.createNewProfile(profileRequest).subscribe(_ => {
      this.navBar.setNavBarVisibility(true);
      this.router.navigate(['community/events'])
    });
  }

  async createProfileRequest() {
    const profileId = this.userStore.user.value.Uid;

    const profile: Profile = {
      ProfileId: profileId,
      FirstName: this.registerFlowForm.get('firstName').value,
      LastName: this.registerFlowForm.get('lastName').value,
      HomeCountry: this.registerFlowForm.get('homeCountry').value,
      HostCountry: this.registerFlowForm.get('hostCountry').value,
      CurrentCity: this.registerFlowForm.get('currentCity').value,
      Bio: this.registerFlowForm.get('bio').value,
      ProfilePictureUrl: await this.profileStore.uploadProfilePicture(this.profilePicture, profileId, this.platform).toPromise(),
      ImageUrls: await this.profileStore.uploadProfileImages(this.profileImages, profileId, this.platform).toPromise(),
      SavedImageAlbumPreviews: []
    };

    return profile
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
