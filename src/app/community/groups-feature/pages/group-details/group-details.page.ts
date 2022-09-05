import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { map, switchMap, tap } from 'rxjs/operators';
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
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';

@Component({
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss']
})
export class GroupDetailsPage implements OnInit, OnDestroy {
  groupId: number;
  group$: Observable<Group>;
  canViewGroup: boolean;
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
  })

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

  ngOnInit(): void {
    this.segmentToShow = this.groupStore.groupSection;
    this.group$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).pipe(
      tap(group => {
        this.groupId = group.GroupId;
        this.canViewGroup = this.canView(group, this.profileStore.currentProfile.value.ProfileId)
        this.pastEvents$ = this.eventStore.getGroupEvents(group.GroupId, GroupEventsFilterOptions.Past);
        this.futureEvents$ = this.eventStore.getGroupEvents(group.GroupId, GroupEventsFilterOptions.Future);
      })
    );
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
      this.subs.sink = selectImages(1).subscribe(galleryPhotos => this.postPictures.push(galleryPhotos.shift()));
    }
  }

  removePostPicture(index: number) {
    this.postPictures.splice(index, 1);
  }

  canView(group: Group, profileId: number): boolean {
    if (group.PrivacyLevel == PrivacyLevel.Public) {
      return true;
    }
    else if (group.PrivacyLevel == PrivacyLevel.Private) {
      if (group.Members.concat(group.Admins).find(member => member.ProfileId === profileId)) {
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
      ProfileId: this.profileStore.currentProfile.value.ProfileId,
      Content: this.createPostForm.get('postContent').value,
      Date: new Date(),
      ImagesData: images,
    }

    // TODO: ADD ERROR HANDLING: What if the message isn't posted correctly? (Connection issue, etc)
    this.groupStore.createGroupPost(this.groupId, newPost).subscribe(res => {
      this.showPostModal = false;
      this.postPictures = [];
      this.createPostForm.controls['postContent'].setValue('');
      // this.group.Posts = this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1);
    });
  }

  addEvent() {
    this.router.navigate(
      ['community/events/create'],
      { queryParams: { creatorType: EventCreatorIdType.Group, creatorId: this.groupId } }
    );
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
