import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/dto/community/groups/group.dto';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';

@Component({
  selector: 'groups-feature',
  templateUrl: './groups-feature.page.html',
  styleUrls: ['./groups-feature.page.scss']
})
export class GroupsFeaturePage implements OnInit {

  groups: Group[];
  subs = new SubSink();

  constructor(private groupStore: GroupStore) { }

  ngOnInit(): void {
    // TODO: we need to get groups associated with the specific user
    this.subs.sink = this.groupStore.getGroupAll().subscribe(res => this.groups = res);
  }

}
