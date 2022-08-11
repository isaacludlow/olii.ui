import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { Location } from '@angular/common';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities'
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileRequest } from 'src/app/models/requests/profile/profile-request';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage implements OnInit {
  profile: Profile;
  profilePicture: GalleryPhoto;
  subs = new SubSink();

  profileForm = this.fb.group({
    // TODO-L35: Change edit profile name form field to be two fields: firstName and lastName.
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    //number: [''],
    // TODO-M14: Country Selection should be from a dropdown to standardize country naming conventions
    homeCountry: [''],
    hostCountry: [''],
    currentCity: [''],
    bio: [''],
  })

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore,
    private location: Location
  ) { }

  ngOnInit(): void {
    // TODO-M6: Remove reference to hard-coded user
    //this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    this.profile = this.profileStore.currentUserProfile;

    if (this.profile != null) {
      this.profilePicture = <GalleryPhoto>{ webPath: this.profile.ProfilePictureUrl };
      this.profileForm.controls['firstName'].setValue(this.profile.FirstName);
      this.profileForm.controls['lastName'].setValue(this.profile.LastName);
      this.profileForm.controls['homeCountry'].setValue(this.profile.HomeCountry);
      this.profileForm.controls['hostCountry'].setValue(this.profile.HostCountry);
      this.profileForm.controls['currentCity'].setValue(this.profile.CurrentCity);
      this.profileForm.controls['bio'].setValue(this.profile.Bio);
    }
  }

  navigateBack() {
    this.location.back();
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  setProfilePicture() {
    selectImages(1).subscribe(galleryPhotos => this.profilePicture = galleryPhotos.shift());
  }

  // TODO-M12: Implement onSubmit for the form
  async onSubmit(): Promise<void> {
    const profileRequest: ProfileRequest = {
      FirstName: this.profileForm.get('firstName').value,
      LastName: this.profileForm.get('lastName').value,
      ProfilePictureFile: await readPhotoAsBase64(this.profilePicture, this.platform),
      HomeCountry: this.profileForm.get('homeCountry').value,
      HostCountry: this.profileForm.get('hostCountry').value,
      CurrentCity: this.profileForm.get('currentCity').value,
      Bio: this.profileForm.get('bio').value,
      ConnectedSocials: null,
      Friends: null,
      ImageFiles: null,
      SavedAlbums: null,
    };

    this.profileStore.updateProfile(profileRequest);
  }

}
