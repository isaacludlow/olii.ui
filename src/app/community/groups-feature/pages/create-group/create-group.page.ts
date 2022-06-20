import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { GroupStore } from 'src/app/shared/services/community/groups/group.store';
import { SubSink } from 'subsink';

@Component({
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage implements OnInit {

  // TODO: We want some singleton to hold the logged in user's data instead of calling it from API each time
  profile: Profile;
  friends: Profile[];
  groupVisibility:string = "Public";
  subs = new SubSink();

  createGroupForm = this.fb.group({
    name: [''],
    description: [''],
    //tags:[],
  })

  constructor(private fb: FormBuilder, private profileStore: ProfileStore, private groupStore: GroupStore) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
    this.subs.sink = this.profileStore.getFriends(98).subscribe(res => this.friends = res);
  }

}
