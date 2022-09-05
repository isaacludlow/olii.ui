import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { LatestGroupPost } from 'src/app/models/dto/community/groups/group-latest-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { PartialGroup } from '../../models/dto/community/groups/partial-group.dto';
import { Router } from '@angular/router';
import { PrivacyLevel } from 'src/app/models/dto/misc/privacy-level.dto';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {
  private readonly _postLimiter: number = 10;
  profile: Profile;
  myGroups: Group[];
  myGroups$: Observable<Group[]>;
  latestGroupPosts$: Observable<LatestGroupPost[]>;
  subs = new SubSink();

  constructor(
    private profileStore: ProfileStore,
    private groupStore: GroupFeatureStore, 
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profile = this.profileStore.currentUserProfile;

    this.myGroups$ = this.groupStore.getMyGroups(this.profile.Id).pipe(tap(myGroups => {
      this.latestGroupPosts$ = this.groupStore.getLatestPosts(myGroups.map(x => x.GroupId));
    }));
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  createGroup(): void {
    this.router.navigate(['community/groups/create'],);
  }

  canView(group: Group): boolean {
    if (group.PrivacyLevel == PrivacyLevel.Public) {
      return true;
    }
    else if (group.PrivacyLevel == PrivacyLevel.Private) {
      if (group.Members.concat(group.Admins).find(member => member.ProfileId === this.profile.Id)) {
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
