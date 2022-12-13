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
import { NavController, Platform } from '@ionic/angular';
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
  groupId: string;
  group$: Observable<Group>;
  canViewGroup: boolean;
  pastEvents$: Observable<Event[]>;
  futureEvents$: Observable<Event[]>;
  showPostModal: boolean
  segmentToShow: string;
  subSegmentToShow: string = 'future';
  memberProfilePictures: string[]
  disableButtons: boolean;
  addPictureImage: GalleryPhoto = <GalleryPhoto>{ webPath: '../../../../assets/images/placeholder-profile-image.png' };
  postPictures: GalleryPhoto[] = [];
  createPostForm = this.fb.group({
    postContent: ['', [Validators.required, Validators.minLength(8)]],
  })
  subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private groupStore: GroupFeatureStore,
    private eventStore: EventsFeatureStore,
    private profileStore: ProfileStore,
    private router: Router, 
    private route: ActivatedRoute,
    private nav: NavController
  ) { }

  ngOnInit(): void {
    this.segmentToShow = this.groupStore.groupSection;
    this.group$ = this.route.paramMap.pipe(
      tap((paramMap: ParamMap) => {
        const groupId = paramMap.get('groupId');
        
        this.pastEvents$ = this.eventStore.getGroupEvents(groupId, GroupEventsFilterOptions.Past);
        this.futureEvents$ = this.eventStore.getGroupEvents(groupId, GroupEventsFilterOptions.Future);
      }),
      switchMap((paramMap: ParamMap) => this.groupStore.getGroupById(paramMap.get('groupId'))),
      tap(group => {
        this.groupId = group.GroupId;
        this.subs.sink = this.profileStore.currentProfile.subscribe(profile => this.canViewGroup = this.canView(group, profile.ProfileId));
      }),
      map(group => {
        this.subs.sink = this.groupStore.getPostsByGroupId(group.GroupId, new Date(2020)).subscribe(posts => group.Posts = posts);
        return group;
      })
    );
  }

  async editGroup() {
    await this.nav.pop();
    this.router.navigate(['community/groups/group/', this.groupId, 'edit']);
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

  canView(group: Group, profileId: string): boolean {
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
    this.subs.sink = this.groupStore.createGroupPost(this.groupId, newPost).subscribe(res => {
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
