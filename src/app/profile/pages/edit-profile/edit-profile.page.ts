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
    number: [''],
    homeCountry: [''],
    age: [''],
    currentCity: [''],
    bio: [''],
  })

  constructor(private fb: FormBuilder, private profileStore: ProfileStore) { }

  ngOnInit(): void {
    this.subs.sink = this.profileStore.getProfileById(98).subscribe(res => this.profile = res);

    if (this.profile != null) {
      if (this.profile.FirstName && this.profile.LastName) {
        this.profileForm.controls['name'].setValue(this.profile.FirstName + " " + this.profile.LastName);
      }
      // this.profileForm.controls['number'].setValue(this.profile.PhoneNumber);
      this.profileForm.controls['homeCountry'].setValue(this.profile.HomeCountry);
      //this.profileForm.controls['homeCountry'].setValue(this.profile.Age);
      this.profileForm.controls['currentCity'].setValue(this.profile.CurrentCity);
      this.profileForm.controls['bio'].setValue(this.profile.Bio);
    }
  }
}
