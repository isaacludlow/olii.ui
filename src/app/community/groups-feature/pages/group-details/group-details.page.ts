import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GalleryPhoto } from '@capacitor/camera';
import { switchMap, tap } from 'rxjs/operators';
import { selectImages } from 'src/app/shared/utilities';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';
import { FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventsFeatureStore, GroupEventsFilterOptions } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { DatabaseService } from 'src/app/shared/services/bankend/database-service/database.service';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';

@Component({
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss']
})
export class GroupDetailsPage implements OnInit, OnDestroy {
  group: Group;
  group$: Observable<Group>;
  currentProfile: Profile;
  canViewGroup: boolean;
  canEditGroup: boolean;
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
    private nav: NavController,
    private dbService: DatabaseService
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
        this.group = group;
        this.subs.sink = this.profileStore.currentProfile.subscribe(profile => {
          this.currentProfile = profile;
          this.canViewGroup = this.canView(group, profile.ProfileId);
          this.canEditGroup = this.canEdit(group, profile.ProfileId);
        });
      }),
      tap(group => {
        this.subs.sink = this.groupStore.getPostsByGroupId(group.GroupId, new Date(2020)).subscribe(posts => group.Posts = posts);
        return group;
      })
    );
  }

  async editGroup() {
    await this.nav.pop();
    this.router.navigate(['community/groups/group/', this.group.GroupId, 'edit']);
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

  canView(group: Group, profileId: string): boolean {
    if (group.PrivacyLevel == PrivacyLevel.Public) {
      return true;
    }
    else if (group.PrivacyLevel == PrivacyLevel.Private) {
      if (this.isMemberOrAdmin(group, profileId)) {
        return true;
      }
    }

    const content = document.getElementById("group-content");
    content.style.setProperty('--webkit-filter', 'blur(8px)');
    content.style.filter = "blur(8px)";
    this.disableButtons = true;
    return false;
  }

  canEdit(group: Group, profileId: string): boolean {
    if (group.Admins.find(member => member.ProfileId === profileId)) {
      return true;
    }
    return false;
  }

  joinGroup() {
    const profilePreview: ProfilePreview = {
      ProfileId: this.currentProfile.ProfileId,
      FirstName: this.currentProfile.FirstName,
      LastName: this.currentProfile.LastName,
      ProfilePictureUrl: this.currentProfile.ProfilePictureUrl
    }
    this.groupStore.joinGroup(profilePreview, this.group.GroupId);
  }

  addPostPicture() {
    if (this.postPictures.length < 5) {
      this.subs.sink = selectImages(1).subscribe(galleryPhotos => this.postPictures = [galleryPhotos.shift()]);
    }
  }

  removePostPicture(index: number) {
    this.postPictures.splice(index, 1);
  }

  async writePost() {
    const newPostId = this.dbService.generateDocumentId();
    let imageUrls: string[] = [];

    if (this.postPictures.length > 0) {
      imageUrls = await this.groupStore.uploadGroupPostImages(this.postPictures, newPostId, this.platform).toPromise();
      
    }

    const profile = this.profileStore.currentProfile.value;
    const newPost: GroupPost = {
      GroupPostId: newPostId,
      Author: {
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        ProfileId: profile.ProfileId,
        ProfilePictureUrl: profile.ProfilePictureUrl
      },
      GroupPreview: {
        GroupId: this.group.GroupId,
        Name: this.group.Name,
        CoverImageUrl: this.group.CoverImageUrl
      },

      ImageUrls: [...imageUrls],
      Content: this.createPostForm.get('postContent').value,
      Date: new Date(),
      Comments: [],
    }

    // TODO: ADD ERROR HANDLING: What if the message isn't posted correctly? (Connection issue, etc)
    this.subs.sink = this.groupStore.createGroupPost(newPost).subscribe(res => {
      this.showPostModal = false;
      this.postPictures = [];
      this.createPostForm.controls['postContent'].setValue('');
    });
  }

  addEvent() {
    this.router.navigate(
      ['community/events/create'],
      { queryParams: {
        creatorType: EventCreatorIdType.Group, 
        creatorId: this.group.GroupId,
        creatorDisplayName: `${this.group.Name}`,
        imageUrl: this.group.CoverImageUrl
        }
      } 
    );
  }

  isMemberOrAdmin(group: Group, profileId: string): boolean {
    return !!group.Members.concat(group.Admins).find(member => member.ProfileId === profileId);
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
