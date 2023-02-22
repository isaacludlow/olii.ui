import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-collapsible-purple-header-with-right-button-section-one',
  template: `
    <olii-base-header
      mode="ios"
      headerClass="olii-collapsible-purple-header-with-right-button-section-one"
      toolbarClass="olii-collapsible-purple-header-with-right-button-section-one">
      <ion-title color="light">{{ title }}</ion-title>
    </olii-base-header>
  `,
  styleUrls: ['./collapsible-purple-header-with-right-button-section-one.component.scss']
})
export class CollapsiblePurpleHeaderWithRightButtonSectionOneComponent {
  @Input() title: string;
}
