import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './group-main.page.html',
  styleUrls: ['./group-main.page.scss']
})
export class GroupMainPage implements OnInit {
  user: Profile; // TODO: Temporary variable while we do not have a global user var
  group: Group;
  showPostModal: boolean
  subs = new SubSink();
  segmentToShow: string;

  constructor(
    private route: ActivatedRoute,
    private groupStore: GroupStore,
    private profileStore: ProfileStore
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.user = res);
    this.group.Posts = this.group.Posts.sort((a, b) => b.Date > a.Date ? 1 : -1);
    this.segmentToShow = this.groupStore.groupSection;
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  toggleModal(): void {
    this.showPostModal = !this.showPostModal;
  }

  writePost() {
    // TODO: Implement screen/modal once we have the mock up for it
  }
  //sharePhoto() {
    // TODO: Implement screen/modal once we have the mock up for it
  //}
  addEvent() {
    // TODO: Implement screen/modal once we have the mock up for it
  }

}
