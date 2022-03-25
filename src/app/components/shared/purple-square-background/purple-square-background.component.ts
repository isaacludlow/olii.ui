import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'olii-purple-square-background',
  template: `
    <div class="container">
      <div class="background">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./purple-square-background.component.scss']
})
export class PurpleSquareBackgroundComponent {
}
