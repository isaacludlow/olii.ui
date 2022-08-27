import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupPostLatest } from 'src/app/models/dto/community/groups/group-latest-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { PartialGroup } from '../../models/dto/community/groups/partial-group.dto';
import { Router } from '@angular/router';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.do';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {
  private readonly _postLimiter: number = 10;
  profile: Profile;
  myGroups: Group[];
  groupsLatest: GroupPostLatest[];
  partialGroups: PartialGroup[] = [];
  subs = new SubSink();

  constructor(
    private profileStore: ProfileStore,
    private groupStore: GroupFeatureStore, 
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profile = this.profileStore.currentUserProfile;
    this.subs.sink = this.groupStore.getMyGroups(this.profile.Id).subscribe(res =>  {
      this.myGroups = res;
      this.calcLatestPosts();
      this.calcPartialGroups();
    });
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  calcLatestPosts() {
    this.groupsLatest = [];
    
    for (const group of this.myGroups) {
      if (this.canView(group)) {
        var posts = [...group.Posts]; // Creating new array so the reverse() method doesn't mutate the original array.
        posts.reverse().slice(0, this._postLimiter);

        for (const post of posts) {
          this.groupsLatest.push(
            {
              GroupId: group.Id,
              GroupName: group.Name,
              GroupImageUrl: group.CoverImageUrl,
              GroupPost: post,
            }
          )
        }
      }
    }

    this.sortGroupPosts();
  }

  sortGroupPosts() {
    this.groupsLatest = this.groupsLatest.sort((a, b) => b.GroupPost.Date > a.GroupPost.Date ? 1 : -1);
  }

  createGroup(): void {
    // Creator type is 'Group' when creating an event from a group details page.
    this.router.navigate(
      ['community/groups/create'],
      { queryParams: { creatorType: 'Profile', creatorId: this.profileStore.currentUserProfile.Id } }
    );
  }

  calcPartialGroups() {
    for (const group of this.myGroups) {
      this.partialGroups.push({
        GroupId: group.Id,
        GroupName: group.Name,
        CoverImageUrl: group.CoverImageUrl,
      })
    }
  }

  canView(group: Group): boolean {
    if (group.PrivacyLevel == PrivacyLevel.Public) {
      return true;
    }
    else if (group.PrivacyLevel == PrivacyLevel.Private) {
      if (group.Members.concat(group.Admins).find(member => member.Id === this.profile.Id)) {
        return true;
      }
    }
    return false;
  }

  calcDisplayGroups() {
    return Math.round((window.innerWidth - this.convertRemToPixels(5.8)) / this.convertRemToPixels(4.8));
  }

  convertRemToPixels(rem: number): number {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

}
