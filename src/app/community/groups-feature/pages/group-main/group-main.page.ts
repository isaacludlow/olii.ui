import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './group-main.page.html',
  styleUrls: ['./group-main.page.scss']
})
export class GroupMainPage implements OnInit {
  group: Group;
  subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupStore: GroupStore
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => 
        this.groupStore.getGroupById(+paramMap.get('groupId'))
      )
    ).subscribe(group => this.group = group);
  }

  getPosterImageUrl(postAuthorUserId: number) {
    // TODO: Error check; need to return some missing image url in the event we can't find the profile for some reason
    return this.group.Members.find(member => member.Id === postAuthorUserId).ProfilePictureUrl;
  }

  getPosterName(postAuthorUserId: number) {
    var firstName = this.group.Members.find(member => member.Id === postAuthorUserId).FirstName;
    var lastName = this.group.Members.find(member => member.Id === postAuthorUserId).LastName;
    return firstName + " " + lastName;
  }

  writePost() {
    // TODO: Implement screen/modal once we have the mock up for it
  }
  sharePhoto() {
    // TODO: Implement screen/modal once we have the mock up for it
  }
  addEvent() {
    // TODO: Implement screen/modal once we have the mock up for it
  }

}
