import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { switchMap } from 'rxjs/operators';
import { readPhotoAsBase64, selectImages } from 'src/app/shared/utilities';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';
import { CreatePostRequest } from 'src/app/models/requests/community/groups/create-post-request';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore, GroupEventsFilterOptions, MyEventsFilterOptions } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.do';

@Component({
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss']
})
export class GroupDetailsPage implements OnInit {
  // TODO-AfterBeta: Convert group to an observable stream, like groupPosts$.

  group: Group;
  groupPosts$: Observable<GroupPost[]>;
  pastEvents$: Observable<Event[]>;
  futureEvents$: Observable<Event[]>;
  showPostModal: boolean
  subs = new SubSink();
  segmentToShow: string;
  subSegmentToShow: string = 'past';
  memberProfilePictures: string[]
  disableButtons: boolean;
  addPictureImage: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  postPictures: GalleryPhoto[] = [];
  createPostForm = this.fb.group({
    postContent: ['', [Validators.required, Validators.minLength(8)]],
  },
  { updateOn: 'blur' }
  )

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupFeatureStore,
    private eventStore: EventsFeatureStore,
    private profileStore: ProfileStore,
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {

    this.segmentToShow = this.groupStore.groupSection;
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => {
      this.group = group;
      this.sortGroupPosts();
      this.canView();
      this.memberProfilePictures = this.group.Members.map(member => member.ProfilePictureUrl);
      this.pastEvents$ = this.eventStore.getGroupEvents(this.group.Id, GroupEventsFilterOptions.Past).pipe();
      this.futureEvents$ = this.eventStore.getGroupEvents(this.group.Id, GroupEventsFilterOptions.Future).pipe();
    });
  }

  // TODO-AfterBeta: Double check that we need to sort group posts.
  // I think they will naturally be in the order people add them, which will be in chronological order.
  sortGroupPosts() {
    this.groupPosts$ = of(this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1));
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  subSegmentChanged(event) {
    this.subSegmentToShow = event.detail.value;
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
    if (this.group.PrivacyLevel == PrivacyLevel.Public) {
      return true;
    }
    else if (this.group.PrivacyLevel == PrivacyLevel.Private) {
      if (this.group.Members.concat(this.group.Admins).find(member => member.Id === this.profileStore.currentUserProfile.Id)) {
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
    // TODO-L23: Create logic on the group-details page to let the user request to join a group.
  }

  async writePost() {
    var images = [];
    for (const image of this.postPictures) {
      images.push(await readPhotoAsBase64(image, this.platform));
    }

    const newPost: CreatePostRequest = {
      Group: this.group.Id,
      Author: this.profileStore.currentUserProfile.Id,
      Content: this.createPostForm.get('postContent').value,
      Date: new Date(Date.now()),
      ImagesData: images,
    }

    // TODO: ADD ERROR HANDLING: What if the message isn't posted correctly? (Connection issue, etc)
    this.groupStore.createGroupPost(newPost).subscribe(res => {
      this.showPostModal = false;
      this.postPictures = [];
      this.createPostForm.controls['postContent'].setValue('');
      this.group.Posts = this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1);
    });
  }

  addEvent() {
    this.router.navigate(
      ['community/events/create'],
      { queryParams: { creatorType: 7, creatorId: this.group.Id } }
    );
  }

}
