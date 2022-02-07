import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'base-icon',
  template: `
    <ion-icon [ngClass]="size" [name]="name"></ion-icon>
  `,
  styleUrls: ['./base-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseIconComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  @Input() size: string;

  /** Name of the icon */
  @Input() name: string;
}
