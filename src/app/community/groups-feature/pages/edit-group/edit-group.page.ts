import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { selectImages } from 'src/app/shared/utilities'
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { Location } from '@angular/common';

@Component({
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss']
})
export class EditGroupPage implements OnInit {

  group: Group;
  groupCoverImage: GalleryPhoto = null;
  loadingButton: boolean;
  subs = new SubSink();

  editGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    coverImageUrl: [null],
    privacyLevel: [PrivacyLevel.Public, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);

    this.groupCoverImage = <GalleryPhoto>{ webPath: this.group.CoverImageUrl };
    this.editGroupForm.controls['name'].setValue(this.group.Name);
    this.editGroupForm.controls['description'].setValue(this.group.Description);
  }

  setGroupCoverImage() {
    selectImages(1).subscribe(galleryPhotos => {
      const coverImage = galleryPhotos.shift();
      this.editGroupForm.get('coverImageUrl').setValue(coverImage);
      this.groupCoverImage = coverImage;
    });
  }

  removeGroupCoverImage(): void {
    this.groupCoverImage = null;
    this.editGroupForm.get('coverImageUrl').setValue(null);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  navigateBack(): void {
    this.location.back();
  }

  async updateGroup() {
    this.loadingButton = true;
    const groupId = this.group.GroupId;

    const updatedGroup: GroupRequest = {
      GroupId: groupId,
      CoverImageUrl: this.editGroupForm.get('coverImageUrl').value == null
        ? this.group.CoverImageUrl
        : await this.groupStore.uploadGroupCoverImage(this.editGroupForm.get('coverImageUrl').value, this.group.GroupId, this.platform).toPromise(),
      Name: this.editGroupForm.get('name').value,
      Description: this.editGroupForm.get('description').value,
      PrivacyLevel: this.editGroupForm.get('privacyLevel').value,
      Admins: this.group.Admins
    }
  
    this.subs.sink = this.groupStore.updateGroup(updatedGroup).subscribe(() => {
      this.loadingButton = false;
      this.router.navigate(['community/groups/group/' + groupId])
    })
  }
}
