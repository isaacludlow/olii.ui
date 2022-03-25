import { Component } from '@angular/core';

@Component({
  selector: 'olii-blue-circle-background',
  template: `
    <div class="container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./blue-circle-background.component.scss']
})
export class BlueCircleBackgroundComponent {}
