import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Group } from 'src/app/models/dto/community/groups/group.dto';

@Component({
  selector: 'olii-group-card',
  template: `
    <ion-card>
      <div class="content">
        <div class="cover-image">
          <olii-responsive-aspect-ratio-container aspectRatio="1/1">
          <olii-container-cover-image [imageUrl]="sanitizeUrl(group.CoverImageUrl)"></olii-container-cover-image>
          </olii-responsive-aspect-ratio-container>
        </div>  
        <div class="group-details">
          <h4 class="line-clamp">{{ group.Name }}</h4>
          <div class = "font-body-s">{{ group.Description}}</div>
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

  constructor(
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

sanitizeUrl(url: string): string {
  return this.domSanitizer.bypassSecurityTrustUrl(url) as string;
  }
}
