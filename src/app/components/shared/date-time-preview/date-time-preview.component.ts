import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-date-time-preview',
  template: `
    <div class="container">
        <div class="date-container">
          <olii-colored-square-background backgroundColor="translucent-purple">
            <olii-base-icon size="extra-small" name="time-outline" color="primary"></olii-base-icon>
          </olii-colored-square-background>
          <div class="font-body-s line-clamp">{{ date | date: 'EE, MMM d' }} {{ date | date: 'h:mm a' }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./date-time-preview.component.scss']
})
export class DateTimePreviewComponent {
  @Input() date: Date;
}
