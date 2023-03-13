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
    profilePicture: [''],
    firstName: [''],
    lastName: [''],
    currentCity: [''],
    hostCountry: [''],
    homeCountry: [''],
    bio: [''],
    imageUrls: [[]]
  });
  profilePicture: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  profileImages: GalleryPhoto[] = [];
  loadingButton: boolean = false;
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
    this.loadingButton = true;
    const profileRequest = await this.createProfileRequest();
    this.subs.sink = this.profileStore.createNewProfile(profileRequest).subscribe(_ => {
      this.navBar.setNavBarVisibility(true);
      this.loadingButton = false;
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
      ProfilePictureUrl: this.registerFlowForm.get('profilePicture').value.length > 0
        ? await this.uploadProfilePicture(this.profilePicture, profileId, this.platform) : '',
      ImageUrls: this.registerFlowForm.get('imageUrls').value.length > 0
        ? await this.uploadProfileImages(this.profileImages, profileId, this.platform) : [],
      SavedImageAlbumPreviews: []
    };

    return profile
  }

  private uploadProfilePicture(profilePicture: GalleryPhoto, profileId: string, platform: Platform): Promise<string> {
    return this.profileStore.uploadProfilePicture(profilePicture, profileId, platform).toPromise();
  }

  private uploadProfileImages(profileImages: GalleryPhoto[], profileId: string, platform: Platform): Promise<string[]> {
    return this.profileStore.uploadProfileImages(profileImages, profileId, platform).toPromise();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
