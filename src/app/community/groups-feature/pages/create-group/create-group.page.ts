import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { GalleryPhoto } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { selectImages } from 'src/app/shared/utilities';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { DatabaseService } from 'src/app/shared/services/bankend/database-service/database.service';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage {
  friends: Profile[];
  subs = new SubSink();
  groupCoverImage: GalleryPhoto;
  loadingButton: boolean;

  createGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    privacyLevel: [PrivacyLevel.Public, Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private profileStore: ProfileStore, 
    private router: Router,
    private groupStore: GroupFeatureStore,
    private dbService: DatabaseService
  ) { }

  setGroupPicture() {
    this.subs.sink = selectImages(1).subscribe(galleryPhotos => this.groupCoverImage = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async createGroup() {
    this.loadingButton = true;
    const profile = this.profileStore.currentProfile.value;
    const newGroupId = this.dbService.generateDocumentId();

    const newGroup: GroupRequest = {
      GroupId: newGroupId,
      CoverImageUrl: await this.groupStore.uploadGroupCoverImage(this.groupCoverImage, newGroupId, this.platform).toPromise(),
      Name: this.createGroupForm.get('name').value,
      Description: this.createGroupForm.get('description').value,
      PrivacyLevel: this.createGroupForm.get('privacyLevel').value,
      Admins: [
        {
          ProfileId: profile.ProfileId,
          FirstName: profile.FirstName,
          LastName: profile.LastName,
          ProfilePictureUrl: profile.ProfilePictureUrl
        }
      ]
    };

    this.subs.sink = this.groupStore.createGroup(newGroup).subscribe(() => {
      this.loadingButton = false;
      this.router.navigate(['community/groups/group/' + newGroupId]);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
