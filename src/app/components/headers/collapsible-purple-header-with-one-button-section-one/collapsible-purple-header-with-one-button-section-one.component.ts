import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'olii-collapsible-purple-header-with-one-button-section-one',
  template: `
    <olii-base-header
      mode="ios"
      headerClass="olii-collapsible-purple-header-with-one-button-section-one"
      toolbarClass="olii-collapsible-purple-header-with-one-button-section-one">
      
      <ion-title color="light">{{ title }}</ion-title>
      <ion-buttons [collapse]="true" [slot]="buttonPosition">
          <olii-colored-square-background backgroundColor="purple-tinted-white" (click)="buttonClickEventEmitter.emit()">
              <olii-base-icon [name]="iconName" color="primary" size="small"></olii-base-icon>
          </olii-colored-square-background>
      </ion-buttons>
    </olii-base-header>
  `,
  styleUrls: ['./collapsible-purple-header-with-one-button-section-one.component.scss']
})
export class CollapsiblePurpleHeaderWithOneButtonSectionOneComponent {
  @Input() title: string;
  @Input() iconName: string;
  @Input() buttonPosition: 'start' | 'end';
  @Output() buttonClickEventEmitter = new EventEmitter();
}
