import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-base-icon',
  template: `
    <ion-icon [ngClass]="size" [name]="name" [color]="color"></ion-icon>
  `,
  styleUrls: ['./base-icon.component.scss']
})
export class BaseIconComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  @Input() size: string;
  /** Name of the icon. */
  @Input() name: string;
  /** Specifies the color from the Ionic app colors: primary, secondary, tertiary, light, medium, and dark. */
  @Input() color: string;
}
