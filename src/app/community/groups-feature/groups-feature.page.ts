import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {

  groups: Group[];
  subs = new SubSink();

  constructor(private groupStore: GroupStore, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // TODO: we need to get groups associated with the specific user
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res => this.groups = res);
  }

  sanitizeUrl(url: string): string {
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }

  calcDisplayGroups() {
    // TODO: Need to get rid of the magic numbers...
    return (screen.width - this.convertRemToPixels(5)) / this.convertRemToPixels(4.8);
  }

  convertRemToPixels(rem: number): number {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

}
