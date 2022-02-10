import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'location-preview',
  template: `
    <div class="container">
      <purple-square-background>
        <base-icon class="icon" size="medium" name="location-outline"></base-icon>
      </purple-square-background>
      <div class="font-body-s">{{ locationText | truncate:20:'...' }}</div>
    </div>
  `,
  styleUrls: ['./location-preview.component.scss']
})
export class LocationPreviewComponent {
  @Input() locationText: string;
}
