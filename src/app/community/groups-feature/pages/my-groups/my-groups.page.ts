import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss']
})
export class MyGroupsPage implements OnInit {
  groups$: Observable<Group[]>;

  constructor(
    private router: Router,
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupStore.getMyGroups(this.profileStore.currentProfile.value.ProfileId);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  navigateToGroupsPage(): void {
    this.router.navigate(['community/groups'])
  }
}
