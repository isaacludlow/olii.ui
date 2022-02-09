import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'date-time-preview',
  template: `
    <div class="container">
      <div class="date-location-container">
        <div class="date-container">
          <purple-square-background>
            <base-icon class="icon" size="medium" name="time-outline"></base-icon>
          </purple-square-background>
          <div class="date heading-5">{{ date | date: 'EE, MMM d' }}</div>
        </div>
        <div class="time font-body-s">{{ date | date: 'h:mm aa' }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./date-time-preview.component.scss']
})
export class DateTimePreviewComponent {
  @Input() date: Date;
}
