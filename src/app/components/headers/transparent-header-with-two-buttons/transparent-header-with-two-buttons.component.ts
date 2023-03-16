import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'olii-transparent-header-with-two-buttons',
  template: `
    <olii-base-header mode="ios" toolbarClass="olii-transparent-header-with-two-buttons">
      <ion-buttons class="start" slot="start">
        <olii-colored-square-background backgroundColor="purple-tinted-white" (click)="leftButtonClickEventEmitter.emit()">
            <olii-base-icon [name]="leftIconName" color="primary" size="small"></olii-base-icon>
        </olii-colored-square-background>
      </ion-buttons>
      <ion-buttons class="end" slot="end">
        <olii-colored-square-background backgroundColor="purple-tinted-white" (click)="rightButtonClickEventEmitter.emit()">
            <olii-base-icon [name]="rightIconName" color="primary" size="small"></olii-base-icon>
        </olii-colored-square-background>
      </ion-buttons>
    </olii-base-header>
  `,
  styleUrls: ['./transparent-header-with-two-buttons.component.scss']
})
// To use this component the consuming page must have fullscreen set to true on the ion-content tag.
// You'll also want to put a class on this so that you don't mess up any other ion-content tags used for modals, etc.
// Example: <ion-content class="main" [fullscreen]="true">
// Then, set these styles on ion-content in the scss for that page.
// ion-content.main {
//   position: absolute;
// }
export class TransparentHeaderWithTwoButtonsComponent {
  @Input() leftIconName: string;
  @Input() rightIconName: string;
  @Output() leftButtonClickEventEmitter = new EventEmitter();
  @Output() rightButtonClickEventEmitter = new EventEmitter();
}
