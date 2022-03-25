import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/dto/profile/profile.dto';
import { ProfileService } from './shared/services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfileComponent implements OnInit {
  profileExampleData: Profile = <Profile>{
    ProfileId: 98,
    UserId: 98,
    NumberOfConnections: 127,
    Bio: "Livin' the dream life. Adventurer. Professional turtle racer.",
    HomeCountry: 'USA',
    HostCountry: 'Germany',
    HostCity: 'Berlin',
    ProfileImageUrl: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'
  };
  // ===============================================
  profile: Profile;
  profilePostUrls: string[]; 

  constructor() { }

  ngOnInit(): void {
    this.profile = this.profileExampleData;
  }

  segmentChanged(event: any) {
    
  }
}
