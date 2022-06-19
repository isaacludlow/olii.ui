import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/dto/community/events/event.dto';

@Component({
  selector: 'olii-event-card',
  template: `
    <ion-card>
      <div class="content">
        <olii-responsive-aspect-ratio-container aspectRatio="1/1">
          <olii-container-cover-image [imageUrl]="event.CoverImageUrl" boarderRadius="5%"></olii-container-cover-image>
        </olii-responsive-aspect-ratio-container>
        <div class="event-details">
          <h5>{{ event.Title }}</h5>
          <div class="location-time">
            <olii-location-preview [locationText]=""></olii-location-preview>
            <olii-date-time-preview [date]="event.Date"></olii-date-time-preview>
          </div>
          <olii-profile-preview-icons [profilePictureUrls]="profilePictureUrls" profileIconSize="small"></olii-profile-preview-icons>
        </div>
      </div>
    </ion-card>
  `,
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  profilePictureUrls: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.profilePictureUrls = this.event.Invitations.map(i => i.Recipient.ProfilePictureUrl);
  }

}
