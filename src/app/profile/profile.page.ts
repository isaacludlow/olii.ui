import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Profile } from '../models/dto/profile/profile.dto';
import { ProfileStore } from '../shared/services/profile/profile.store';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Profile;
  profilePostUrls: string[];
  segmentToShow: string = 'photos';
  subs = new SubSink();

  constructor(private profileStore: ProfileStore) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
  }

  segmentChanged(event) {
    this.segmentToShow = event.detail.value;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
