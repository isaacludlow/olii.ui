import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities'
import { PrivacyLevel } from 'src/app/models/dto/community/groups/group-privacy-level.do';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss']
})
export class EditGroupPage implements OnInit {

  user: Profile; // TODO: Temporary variable while we do not have a global user var
  group: Group;
  groupVisibility:string;
  groupPicture: GalleryPhoto;
  subs = new SubSink();

  editGroupForm = this.fb.group({
    name: [''],
    description: [''],
  })

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupStore,
    private profileStore: ProfileStore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
    this.groupVisibility = this.group.PrivacyLevel;
    this.groupPicture = <GalleryPhoto>{ webPath: this.group.CoverImageUrl };
    this.editGroupForm.controls['name'].setValue(this.group.Name);
    this.editGroupForm.controls['description'].setValue(this.group.Description);
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.user = res);
  }

  setGroupPicture() {
    selectImages(1).subscribe(galleryPhotos => this.groupPicture = galleryPhotos.shift());
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  async updateGroup() {
    this.group.Name = this.editGroupForm.get('name').value;
    this.group.Description = this.editGroupForm.get('description').value;
    this.group.PrivacyLevel = this.groupVisibility as PrivacyLevel;
    this.group.CoverImageUrl = await readPhotoAsBase64(this.groupPicture, this.platform);
  
    //this.groupStore.updateGroup(this.group).subscribe(res => {
    //  this.router.navigate(['community/groups/'])
    //})
  }

}
