import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-responsive-aspect-ratio-container',
  template: `
    <div [ngStyle]="{'aspect-ratio': aspectRatio}" class="container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./responsive-aspect-ratio-container.component.scss']
})
export class ResponsiveAspectRatioContainerComponent {
  @Input() aspectRatio: string;
}
