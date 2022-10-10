import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss']
})
export class GroupMembersPage implements OnInit {
  group: Group;
  subs = new SubSink();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupStore: GroupFeatureStore
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
  }

  getGroupId() {
    return this.route.snapshot.paramMap.get('groupId')
  }

  navigateToUserProfile(profileId: number) {
    this.router.navigate(['/profile'], { queryParams: { profileId: profileId, showBackButton: true } })
  }
}
