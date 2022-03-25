import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-date-time-preview',
  template: `
    <div class="container">
      <div class="date-location-container">
        <div class="date-container">
          <olii-purple-square-background>
            <olii-base-icon class="icon" size="medium" name="time-outline"></olii-base-icon>
          </olii-purple-square-background>
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
