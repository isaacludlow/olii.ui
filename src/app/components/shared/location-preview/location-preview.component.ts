import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'olii-location-preview',
  template: `
    <div class="container">
      <olii-purple-square-background>
        <olii-base-icon class="icon" size="medium" name="location-outline"></olii-base-icon>
      </olii-purple-square-background>
      <div class="font-body-s">{{ locationText | truncate:20:'...' }}</div>
    </div>
  `,
  styleUrls: ['./location-preview.component.scss']
})
export class LocationPreviewComponent {
  @Input() locationText: string;
}
