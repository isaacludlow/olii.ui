import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-base-spacer',
  template: `
    <div [ngStyle]="{'margin-bottom.rem': rems}"></div>
  `,
  styleUrls: ['./base-spacer.component.scss']
})
export class BaseSpacerComponent {
  @Input() rems: number;
}
