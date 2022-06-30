import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { switchMap } from 'rxjs/operators';
import { selectImages } from 'src/app/shared/utilities';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';
import { CreatePostRequest } from 'src/app/models/requests/community/groups/create-post-request';
import { FormBuilder } from '@angular/forms';
import { GroupService } from 'src/app/shared/services/community/groups/group.service';

@Component({
  templateUrl: './group-main.page.html',
  styleUrls: ['./group-main.page.scss']
})
export class GroupMainPage implements OnInit {
  user: Profile; // TODO: Temporary variable while we do not have a global user var
  group: Group;
  showPostModal: boolean
  subs = new SubSink();
  segmentToShow: string;
  addPictureImage: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  postPictures: GalleryPhoto[] = [];
  createPostForm = this.fb.group({
    postContent: [''],
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private groupStore: GroupStore,
    private groupService: GroupService,
    private profileStore: ProfileStore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.user = res);
    this.sortGroupPosts();
    this.segmentToShow = this.groupStore.groupSection;
  }

  sortGroupPosts() {
    this.group.Posts = this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1);
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
    selectImages(1).subscribe(galleryPhotos => this.postPictures.push(galleryPhotos.shift()));
  }

  removePostPicture(index: number) {
    this.postPictures.splice(index, 1);
  }

  // TODO: Add form control to prevent empty posting.  Must have either an image or text or both
  writePost() {

    var images = [];
    for (const image of this.postPictures) {
      images.push(this.sanitizeUrl(image.webPath));
    }

    const newPost: CreatePostRequest = {
      Group: this.group.Id,
      Author: 
        {
          Id: this.user.Id,
          FirstName: this.user.FirstName,
          LastName: this.user.LastName,
          ProfilePictureUrl: this.user.ProfilePictureUrl
        },
      Content: this.createPostForm.get('postContent').value,
      Date: new Date(Date.now()),
      ImageUrls: images,
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
