import { Component } from '@angular/core';

@Component({
  selector: 'blue-circle-background',
  template: `
    <div class="container">
      <ng-content class="content"></ng-content>
    </div>
  `,
  styleUrls: ['./blue-circle-background.component.scss']
})
export class BlueCircleBackgroundComponent {}
