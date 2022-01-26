import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-base-icon',
  template: `
    <ion-icon [ngClass]="size" [name]="name"></ion-icon>
  `,
  styleUrls: ['./base-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseIconComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  size: string;
  /** Name of the icon */
  name: string;

  constructor() { }

}
