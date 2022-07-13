import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './groups-all.page.html',
  styleUrls: ['./groups-all.page.scss']
})
export class GroupsAllPage implements OnInit {

  groups: Group[]
  subs = new SubSink();

  constructor(private groupStore: GroupStore, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
