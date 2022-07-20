import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { switchMap } from 'rxjs/operators';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';
import { CreatePostRequest } from 'src/app/models/requests/community/groups/create-post-request';
import { FormBuilder } from '@angular/forms';
import { GroupService } from 'src/app/shared/services/community/groups/group.service';
import { Platform } from '@ionic/angular';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss']
})
export class GroupDetailsPage implements OnInit {
  profile: Profile; // TODO: Temporary variable while we do not have a global user var
  group: Group;
  groupPosts$: Observable<GroupPost[]>;
  showPostModal: boolean
  subs = new SubSink();
  segmentToShow: string;
  disableButtons: boolean;
  addPictureImage: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  postPictures: GalleryPhoto[] = [];
  createPostForm = this.fb.group({
    postContent: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupStore,
    private groupService: GroupService,
    private profileStore: ProfileStore,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    this.sortGroupPosts();
    this.segmentToShow = this.groupStore.groupSection;
    this.canView();
  }

  sortGroupPosts() {
    this.groupPosts$ = of(this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1));
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  toggleModal(): void {
    this.showPostModal = !this.showPostModal;
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  addPostPicture() {
    if (this.postPictures.length < 5) {
      selectImages(1).subscribe(galleryPhotos => this.postPictures.push(galleryPhotos.shift()));
    }
  }

  removePostPicture(index: number) {
    this.postPictures.splice(index, 1);
  }

  canView(): boolean {
    if (this.group.PrivacyLevel == 'Public') {
      return true;
    }
    else if (this.group.PrivacyLevel == "Friends-Only") {
      // You must be a friend of the creator of the group
    }
    else if (this.group.PrivacyLevel == "Invite-Only") {
      if (this.group.Members.concat(this.group.Admins).find(member => member.Id === this.profile.Id)) {
        return true;
      }
    }
    const content = document.getElementById("group-content");
    content.style.setProperty('--webkit-filter', 'blur(8px)');
    content.style.filter = "blur(8px)";
    this.disableButtons = true;
    return false;
  }

  requestToJoinGroup() {
    // TODO: Connect to request feature (pending)
  }

  // TODO: Add form control to prevent empty posting.  Must have either an image or text or both
  async writePost() {

    var images = [];
    for (const image of this.postPictures) {
      images.push(await readPhotoAsBase64(image, this.platform));
    }

    const newPost: CreatePostRequest = {
      Group: this.group.Id,
      Author: 
        {
          Id: this.profile.Id,
          FirstName: this.profile.FirstName,
          LastName: this.profile.LastName,
          ProfilePictureUrl: this.profile.ProfilePictureUrl
        },
      Content: this.createPostForm.get('postContent').value,
      Date: new Date(Date.now()),
      ImagesData: images,
    }

    // TODO: ADD ERROR HANDLING
    this.groupService.createGroupPost(newPost).subscribe(res => {
      this.showPostModal = false;
      this.postPictures = [];
      this.createPostForm.controls['postContent'].setValue('');
      this.group.Posts = this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1);
    });
  }

  addEvent() {
    // TODO: Implement screen/modal once we have the mock up for it
  }

}
