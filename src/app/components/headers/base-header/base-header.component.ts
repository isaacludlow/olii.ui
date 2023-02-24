import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-base-header',
  template: `
    <ion-header [collapse]="collapseMode" [mode]="mode" [ngClass]="headerClass">
      <ion-toolbar #toolbar [mode]="mode" [ngClass]="toolbarClass">
        <ng-content></ng-content>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent {
  /** The name of child component. The child component should then pass in a class name that matches a css class in the base-header scss file. */
  @Input() headerClass: string | null;
  /** The name of child component. The child component should then pass in a class name that matches a css class in the base-header scss file. */
  @Input() toolbarClass: string | null;
  /** Describes the scroll effect that will be applied to the header. Only applies in iOS mode. */
  @Input() collapseMode: string | null;
  @Input() mode: 'ios' | 'md';
}
