import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { SubSink } from 'subsink';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss']
})
export class MyGroupsPage implements OnInit {

  groups: Group[]
  subs = new SubSink();

  constructor(private groupStore: GroupStore, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // TODO-L24: Should get all groups the current user is in, not all groups on the all.
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
