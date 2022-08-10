import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss']
})
export class MyGroupsPage implements OnInit {

  groups: Group[]
  subs = new SubSink();

  constructor(
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.groupStore.getMyGroups(this.profileStore.currentUserProfile.Id).subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
