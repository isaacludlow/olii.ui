import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { CreateGroupRequest } from 'src/app/models/requests/community/groups/create-group-request';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage implements OnInit {

  // TODO: We want some singleton to hold the logged in user's data instead of calling it from API each time
  profile: Profile;
  friends: Profile[];
  groupVisibility:string = 'Public';
  subs = new SubSink();
  groupPicture: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };


  createGroupForm = this.fb.group({
    name: [''],
    description: [''],
    //tags:[],
  })

  constructor(
    private fb: FormBuilder, 
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore, 
    private router: Router,
    private groupService: GroupService,
    ) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    //this.subs.sink = this.profileStore.getFriends(98).subscribe(res => this.friends = res);
  }

  
  setGroupPicture() {
    selectImages(1).subscribe(galleryPhotos => this.groupPicture = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async createGroup() {
    const newGroup: CreateGroupRequest = {
      CoverImageData: await readPhotoAsBase64(this.groupPicture, this.platform),
      Name: this.createGroupForm.get('name').value,
      Description: this.createGroupForm.get('description').value,
      PrivacyLevel: this.groupVisibility as PrivacyLevel,
      Admins: [
        {
          Id: this.profile.Id,
          FirstName: this.profile.FirstName,
          LastName: this.profile.LastName,
          ProfilePictureUrl: this.profile.ProfilePictureUrl
        }
      ],
      // TODO: Calculate what members should be added (make modal)
      Members: [],
    }

    this.groupService.createGroup(newGroup).subscribe(res => {
      this.router.navigate(['community/groups/group/' + res.Id]);
    })
  }

}
