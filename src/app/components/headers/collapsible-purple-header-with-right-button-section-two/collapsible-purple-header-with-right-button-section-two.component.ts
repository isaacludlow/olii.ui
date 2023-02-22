import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'olii-collapsible-purple-header-with-right-button-section-two',
  template: `
    <olii-base-header
      mode="ios"
      collapseMode="condense"
      headerClass="olii-collapsible-purple-header-with-right-button-section-two"
      toolbarClass="olii-collapsible-purple-header-with-right-button-section-two">

      <ion-title color="light" style="font-size: 1.5rem;">{{ title }}</ion-title>
      <ion-buttons slot="end">
          <olii-colored-square-background backgroundColor="purple-tinted-white" (click)="buttonClickEventEmitter.emit()">
              <olii-base-icon [name]="iconName" color="primary" size="small"></olii-base-icon>
          </olii-colored-square-background>
      </ion-buttons>
    </olii-base-header>
  `,
  styleUrls: ['./collapsible-purple-header-with-right-button-section-two.component.scss']
})
export class CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent {
  @Input() title: string;
  @Input() iconName: string;
  @Output() buttonClickEventEmitter = new EventEmitter();
}
