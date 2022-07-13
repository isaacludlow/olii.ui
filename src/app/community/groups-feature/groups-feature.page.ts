import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupPostLatest } from 'src/app/models/dto/community/groups/group-latest-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {

  user: Profile; // TODO: Temporary variable while we do not have a global user var
  groups: Group[];
  groupsLatest: GroupPostLatest[];
  subs = new SubSink();
  POSTLIMITER: number = 10;

  constructor(
    private profileStore: ProfileStore,
    private groupStore: GroupStore, 
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // TODO: we need to get groups associated with the specific user
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.user = res);
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res => this.groups = res);
    this.calcLatestPosts();
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
              GroupName: group.Name,
              GroupImageUrl: group.CoverImageUrl,
              GroupPost: post,
            }
          )
        }
      }
    }
  }

  canView(group: Group): boolean {
    if (group.PrivacyLevel == 'Public') {
      return true;
    }
    else if (group.PrivacyLevel == "Friends-Only") {
      // You must be a friend of the creator of the group
    }
    else if (group.PrivacyLevel == "Invite-Only") {
      if (group.Members.concat(group.Admins).find(member => member.Id === this.user.Id)) {
        return true;
      }
    }
    return false;
  }

  calcDisplayGroups() {
    //var newGroupButtonWidth = document.getElementById('new-group-button-id').clientWidth;
    //var ionContentMargins = document.getElementById('content-id').clientWidth;
    //var ionContentMargins = document.getElementById('content-id').style.paddingLeft;
    //var totalWidth = screen.width - ionContentMargins + newGroupButtonWidth;
    
    //console.log("Screen Width: " + screen.width);
    //console.log("Button Width: " + newGroupButtonWidth);
    //console.log("Content Width: " + ionContentMargins);
    //console.log("Dynamic Calculation: " + (newGroupButtonWidth + this.convertRemToPixels(2)));

    //console.log("According to function: " + this.convertRemToPixels(5));

    // TODO: Need to get rid of the magic numbers...
    return (screen.width - this.convertRemToPixels(5)) / this.convertRemToPixels(4.8);
  }

  convertRemToPixels(rem: number): number {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

}
