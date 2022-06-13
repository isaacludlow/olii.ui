import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SubSink } from 'subsink';
import { FormBuilder } from '@angular/forms';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss']
})
export class EditProfilePage implements OnInit {
  profile: Profile;
  subs = new SubSink();

  profileForm = this.fb.group({
    name: [''],
    numbber: [''],
    homeCountry: [''],
    age: [''],
    currentCity: [''],
    description: [''],
  })

  constructor(private fb: FormBuilder, private profileStore: ProfileStore) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);
  }

}
