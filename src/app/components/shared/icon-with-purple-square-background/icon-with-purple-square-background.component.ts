import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'olii-icon-with-purple-square-background',
  template: `
    <olii-colored-square-background backgroundColor="translucent-purple">
      <olii-base-icon [size]="size" [name]="name"></olii-base-icon>
    </olii-colored-square-background>
  `,
  styleUrls: ['./icon-with-purple-square-background.component.scss']
})
export class IconWithPurpleSquareBackgroundComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  @Input() size: string;

  /** Name of the icon */
  @Input() name: string;
}
