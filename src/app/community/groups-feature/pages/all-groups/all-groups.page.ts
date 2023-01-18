import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  templateUrl: './all-groups.page.html',
  styleUrls: ['./all-groups.page.scss']
})
export class AllGroupsPage implements OnInit {

  groups: Group[]
  subs = new SubSink();

  constructor(
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.groupStore.getAllGroups(this.profileStore.currentProfile.value.ProfileId).subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
