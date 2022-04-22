import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-colored-square-background',
  template: `
    <div class="container">
      <div class="background" [ngClass]="backgroundColor">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./colored-square-background.component.scss']
})
export class ColoredSquareBackgroundComponent {
  @Input() backgroundColor: string;
}
