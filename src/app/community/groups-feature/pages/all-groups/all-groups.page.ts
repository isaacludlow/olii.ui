import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  templateUrl: './all-groups.page.html',
  styleUrls: ['./all-groups.page.scss']
})
export class AllGroupsPage implements OnInit {

  groups: Group[]
  subs = new SubSink();

  constructor(
    private groupStore: GroupFeatureStore,
    private domSanitizer: DomSanitizer,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.groupStore.getAllGroups().subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  navigateBack(): void {
    this.location.back();
  }
}
