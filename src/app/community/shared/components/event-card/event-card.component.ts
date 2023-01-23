import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/dto/community/events/event.dto';

@Component({
  selector: 'olii-event-card',
  template: `
    <ion-card>
      <div class="content">
        <ion-thumbnail>
          <ion-img [src]="event.CoverImageUrl"></ion-img>
        </ion-thumbnail>
        <div class="event-details">
          <h4 class="line-clamp">{{ event.Title }}</h4>
          <olii-location-preview [locationText]="event.Location.DisplayName"></olii-location-preview>
          <olii-date-time-preview [date]="event.Date"></olii-date-time-preview>
          <olii-profile-preview-icons
            *ngIf="event.AttendeesPreview.length > 0"
            [profilePictureUrls]="firstFourProfilePictureUrls"
            profileIconSize="small"
            [additionalDisplayNumber]="event.TotalAttendees - event.AttendeesPreview.length">
          </olii-profile-preview-icons>
        </div>
      </div>
    </ion-card>
  `,
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  firstFourProfilePictureUrls: Array<string>;
  numberOfProfilesDisplayed: number = 5;

  constructor() { }

  ngOnInit(): void {
    this.firstFourProfilePictureUrls = this.event.AttendeesPreview.map(attendee => attendee.ProfilePictureUrl);
  }

}
