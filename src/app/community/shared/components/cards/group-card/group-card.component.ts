import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/dto/community/groups/group.dto';

@Component({
  selector: 'olii-group-card',
  template: `
    <ion-card>
      <div class="content">
        <div class="thumbnail">
          <olii-responsive-aspect-ratio-container aspectRatio="1/1">
            <olii-container-cover-image [imageUrl]="group.CoverImageUrl" boarderRadius="5%"></olii-container-cover-image>
          </olii-responsive-aspect-ratio-container>
        </div>  
        <div class="group-details">
          <h4 class="line-clamp">{{ group.Name }}</h4>
          <div class="font-body-s line-clamp">{{ group.Description}} </div>
          <olii-profile-preview-icons
            [profilePictureUrls]="firstFourProfilePictureUrls"
            profileIconSize="small">
          </olii-profile-preview-icons>
        </div>
      </div>
    </ion-card>
  `,
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {
  @Input() group: Group;
  firstFourProfilePictureUrls: Array<string>;
  numberOfProfilesDisplayed: number = 5;

  constructor() { }

  ngOnInit(): void {
    this.firstFourProfilePictureUrls = this.group.Admins.map(admin => admin.ProfilePictureUrl);
  }

}
