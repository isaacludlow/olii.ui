import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { GroupFeatureService } from 'src/app/shared/services/community/groups-feature/group-feature.service';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.do';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage implements OnInit {

  profile: Profile;
  friends: Profile[];
  subs = new SubSink();
  groupPicture: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };


  createGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    groupVisibility: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore, 
    private router: Router,
    private groupService: GroupFeatureService,
    ) { }

  ngOnInit(): void {
    // TODO-L25: Use the profileStore to get the current user instead of making a call.
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    //this.subs.sink = this.profileStore.getFriends(98).subscribe(res => this.friends = res); // Will add the ability to invite friends to a newly create group in the future.
  }

  
  setGroupPicture() {
    selectImages(1).subscribe(galleryPhotos => this.groupPicture = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async createGroup() {
    const newGroup: GroupRequest = {
      Id: null,
      CoverImageData: await readPhotoAsBase64(this.groupPicture, this.platform),
      Name: this.createGroupForm.get('name').value,
      Description: this.createGroupForm.get('description').value,
      PrivacyLevel: this.createGroupForm.get('groupVisibility').value as PrivacyLevel,
      Admin: this.profileStore.currentUserProfile.Id,
    }

    // TODO-L26: Use groupStore instead of groupService to create a group.
    this.groupService.createGroup(newGroup).subscribe(res => {
      this.router.navigate(['community/groups/group/' + res.Id]);
    })
  }

}
