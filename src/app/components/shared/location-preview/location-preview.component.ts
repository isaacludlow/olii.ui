import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-location-preview',
  template: `
    <div class="container">
      <olii-colored-square-background backgroundColor="translucent-purple">
        <olii-base-icon size="extra-small" name="location-outline" color="primary"></olii-base-icon>
      </olii-colored-square-background>
      <div class="font-body-s">{{ locationText | truncate:20:'...' }}</div>
    </div>
  `,
  styleUrls: ['./location-preview.component.scss']
})
export class LocationPreviewComponent {
  @Input() locationText: string;
}
