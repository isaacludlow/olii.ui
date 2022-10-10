import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { PrivacyLevelRequest } from 'src/app/models/requests/misc/privacy-level-request.do';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage {
  friends: Profile[];
  subs = new SubSink();
  groupPicture: GalleryPhoto;

  createGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    // groupVisibility: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore, 
    private router: Router,
    private groupStore: GroupFeatureStore,
    ) { }

  setGroupPicture() {
    this.subs.sink = selectImages(1).subscribe(galleryPhotos => this.groupPicture = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async createGroup() {
    const newGroup: GroupRequest = {
      GroupId: '0',
      CoverImageData: await readPhotoAsBase64(this.groupPicture, this.platform),
      Name: this.createGroupForm.get('name').value,
      Description: this.createGroupForm.get('description').value,
      PrivacyLevelParamId: PrivacyLevelRequest.Public
    };

    this.subs.sink = this.groupStore.createGroup(this.profileStore.currentProfile.value.ProfileId, newGroup).subscribe(res => {
      this.router.navigate(['community/groups/group/' + res.GroupId]);
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
