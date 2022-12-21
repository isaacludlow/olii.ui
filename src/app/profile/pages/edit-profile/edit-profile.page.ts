import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { Location } from '@angular/common';
import { getAllElementsFromFirstArrayNotInSecondArray, readPhotoAsBase64, selectImages } from 'src/app/shared/utilities'
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { Platform } from '@ionic/angular';
import { Observable, zip } from 'rxjs';
import { CloudStorageService } from 'src/app/shared/services/bankend/cloud-storage-service/cloud-storage.service';

@Component({
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage implements OnInit {
  originalProfile: Profile;
  profilePicture: GalleryPhoto;
  profileImages: GalleryPhoto[] = [];
  subs = new SubSink();

  profileForm = this.fb.group({
    profilePictureUrl: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    // TODO-M14: Country Selection should be from a dropdown to standardize country naming conventions
    homeCountry: [''],
    hostCountry: [''],
    currentCity: [''],
    bio: [''],
  })
  imagesToDelete: string[] = []; // Image urls from cloud storage.
  imagesToUpload: GalleryPhoto[] = [];

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore,
    private storageService: CloudStorageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.profileStore.currentProfile.subscribe(profile => {
      this.originalProfile = profile;
      if (this.originalProfile != null) {
        console.log(profile)
        this.profilePicture = <GalleryPhoto>{ webPath: this.originalProfile.ProfilePictureUrl };
        this.profileForm.controls['firstName'].setValue(this.originalProfile.FirstName);
        this.profileForm.controls['lastName'].setValue(this.originalProfile.LastName);
        this.profileForm.controls['homeCountry'].setValue(this.originalProfile.HomeCountry);
        this.profileForm.controls['hostCountry'].setValue(this.originalProfile.HostCountry);
        this.profileForm.controls['currentCity'].setValue(this.originalProfile.CurrentCity);
        this.profileForm.controls['bio'].setValue(this.originalProfile.Bio);
        this.profileImages = this.originalProfile.ImageUrls.map(imageUrl => <GalleryPhoto>{ webPath: imageUrl });
      }
    });
  }

  navigateBack() {
    this.location.back();
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  setProfilePicture() {
    selectImages(1).subscribe(galleryPhotos => {
      const profilePicture = galleryPhotos.shift();
      this.profileForm.get('profilePictureUrl').setValue(profilePicture);
      this.profilePicture = profilePicture;
    });
  }

  onProfileImagesChange(galleryPhotos: GalleryPhoto[]) {
    const deletedImages = getAllElementsFromFirstArrayNotInSecondArray(this.originalProfile.ImageUrls, galleryPhotos.map(x => x.webPath));
    if (deletedImages.length > 0) {
      for (const deletedImage of deletedImages) {
        if (this.imagesToDelete.includes(deletedImage))
          continue;
        else 
          this.imagesToDelete.push(...deletedImages);
      }
    }

    const newImages = getAllElementsFromFirstArrayNotInSecondArray(galleryPhotos.map(x => x.webPath), this.profileImages.map(x => x.webPath));
    if (newImages.length > 0) {
      for (const newImage of newImages) {
        if (this.imagesToUpload.includes(<GalleryPhoto>{ webPath: newImage}))
          continue;
        else
          this.imagesToUpload.push(<GalleryPhoto>{ webPath: newImage});
      }
    }
  }

  async onSubmit(): Promise<void> {
    let updatedImageUrls: string[] = [];

    if (this.imagesToDelete.length > 0) {
      updatedImageUrls.push(...this.originalProfile.ImageUrls.filter(imageUrl => !this.imagesToDelete.includes(imageUrl)));
      await zip(this.imagesToDelete.map(imageUrl => this.storageService.deleteFile(imageUrl))).toPromise();
    }

    if (this.imagesToUpload.length > 0) {
      const newImagesDownloadUrls = await this.profileStore.uploadProfileImages(this.imagesToUpload, this.originalProfile.ProfileId, this.platform).toPromise();
      updatedImageUrls.push(...newImagesDownloadUrls);
    }

    const profile: Profile = {
      ProfileId: this.originalProfile.ProfileId,
      FirstName: this.profileForm.get('firstName').value,
      LastName: this.profileForm.get('lastName').value,
      ProfilePictureUrl: this.profileForm.get('profilePictureUrl').value == null
        ? this.originalProfile.ProfilePictureUrl
        : await this.profileStore.uploadProfilePicture(this.profilePicture, this.originalProfile.ProfileId, this.platform).toPromise(),
      HomeCountry: this.profileForm.get('homeCountry').value,
      HostCountry: this.profileForm.get('hostCountry').value,
      CurrentCity: this.profileForm.get('currentCity').value,
      Bio: this.profileForm.get('bio').value,
      ImageUrls: updatedImageUrls.length > 0 ? updatedImageUrls : [...this.originalProfile.ImageUrls],
      SavedImageAlbumPreviews: this.originalProfile.SavedImageAlbumPreviews,
    };

    this.profileStore.updateProfile(profile).subscribe(() => this.location.back());
  }
}
