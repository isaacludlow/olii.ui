import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { GroupService } from 'src/app/shared/services/community/groups/group.service';
import { PrivacyLevel } from 'src/app/models/dto/community/groups/group-privacy-level.do';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage implements OnInit {

  // TODO: We want some singleton to hold the logged in user's data instead of calling it from API each time
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
    private groupService: GroupService,
    ) { }

  ngOnInit(): void {
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

    this.groupService.createGroup(newGroup).subscribe(res => {
      this.router.navigate(['community/groups/group/' + res.Id]);
    })
  }

}
