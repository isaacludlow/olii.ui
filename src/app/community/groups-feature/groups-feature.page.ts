import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupPostLatest } from 'src/app/models/dto/community/groups/group-latest-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { PartialGroup } from 'src/app/models/dto/community/groups/partial-group.dto';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {

  profile: Profile;
  groups: Group[];
  groupsLatest: GroupPostLatest[];
  partialGroups: PartialGroup[] = [];
  subs = new SubSink();
  POSTLIMITER: number = 10;

  constructor(
    private profileStore: ProfileStore,
    private groupStore: GroupStore, 
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // TODO: we need to get groups associated with the specific user
    this.profile = this.profileStore.currentUserProfile;
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res =>  {
      this.groups = res;
      this.calcLatestPosts();
      this.calcPartialGroups();
    });
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  calcLatestPosts() {
    this.groupsLatest = [];
    
    for (const group of this.groups) {
      if (this.canView(group)) {
        var posts = group.Posts.slice(0, this.POSTLIMITER);
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

  calcPartialGroups() {
    for (const group of this.groups) {
      this.partialGroups.push({
        GroupId: group.Id,
        GroupName: group.Name,
        CoverImageUrl: group.CoverImageUrl,
      })
    }
  }

  canView(group: Group): boolean {
    if (group.PrivacyLevel == 'Public') {
      return true;
    }
    else if (group.PrivacyLevel == "Private") {
      if (group.Members.concat(group.Admins).find(member => member.Id === this.profile.Id)) {
        return true;
      }
    }
    return false;
  }

  calcDisplayGroups() {
    return Math.round((screen.width - this.convertRemToPixels(8)) / this.convertRemToPixels(4.8));
  }

  convertRemToPixels(rem: number): number {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

}
