import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-date-time-preview',
  template: `
    <div class="container">
      <div class="date-location-container">
        <div class="date-container">
          <olii-colored-square-background backgroundColor="translucent-purple">
            <olii-base-icon size="extra-small" name="time-outline" color="primary"></olii-base-icon>
          </olii-colored-square-background>
          <div class="font-body-s">{{ date | date: 'EE, MMM d' }}</div>
        </div>
        <div class="font-body-s">{{ date | date: 'h:mm aa' }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./date-time-preview.component.scss']
})
export class DateTimePreviewComponent {
  @Input() date: Date;
}
