import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileImage } from '../models/dto/profile/profile-image.dto';
import { Profile } from '../models/dto/profile/profile.dto';
import { ProfileService } from './shared/services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  profilePostUrls: string[]; 

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfileById(98).subscribe(res => this.profile = res);
  }

  segmentChanged(event: any) {
    
  }
}
