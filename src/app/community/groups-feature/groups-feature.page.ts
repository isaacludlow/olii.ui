import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupPreview } from '../../models/dto/community/groups/group-preview.dto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import sub from 'date-fns/sub';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {
  private readonly _postLimiter: number = 10;
  profile: Profile;
  myGroups$: Observable<Group[]>;
  allGroups$: Observable<Group[]>;
  myGroupsPreview$: Observable<GroupPreview[]>
  latestGroupPosts$: Observable<GroupPost[]>;
  subs = new SubSink();
  segmentToShow: string;

  constructor(
    private profileStore: ProfileStore,
    private groupStore: GroupFeatureStore, 
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.currentProfile.subscribe(currentProfile => {
      if (currentProfile !== null) {
        this.myGroups$ = this.groupStore.getMyGroups(currentProfile.ProfileId);
        this.myGroupsPreview$ = this.myGroups$.pipe(
          map(group => group.map(group => <GroupPreview>{ GroupId: group.GroupId, CoverImageUrl: group.CoverImageUrl, Name: group.Name }))
        );

        const earliestPostDate = sub(new Date(), { months: 1 });
        this.latestGroupPosts$ = this.groupStore.getLatestPosts(currentProfile.ProfileId, earliestPostDate);
        this.allGroups$ = this.groupStore.getAllGroups().pipe(tap(res => console.log(res)));
      }
    });
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  createGroup(): void {
    this.router.navigate(['community/groups/create'],);
  }

  // I don't think this method is being used here???
  //
  // canView(group: Group): boolean {
  //   if (group.PrivacyLevel == PrivacyLevel.Public) {
  //     return true;
  //   }
  //   else if (group.PrivacyLevel == PrivacyLevel.Private) {
  //     if (group.Members.concat(group.Admins).find(member => member.ProfileId === this.profile.Id)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  calcDisplayGroups() {
    return Math.round((window.innerWidth - this.convertRemToPixels(5.8)) / this.convertRemToPixels(4.8));
  }

  convertRemToPixels(rem: number): number {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

}
