import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'olii-base-description-text-box',
  template: `
    <div [ngClass]="[textSize, textColor]">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./base-description-text-box.component.scss']
})
export class BaseDescriptionTextBoxComponent {
  @Input() textSize;
  @Input() textColor;
}
