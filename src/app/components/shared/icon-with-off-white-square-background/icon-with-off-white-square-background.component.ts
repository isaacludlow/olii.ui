import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-icon-with-off-white-square-background',
  template: `
    <olii-colored-square-background backgroundColor="purple-tinted-white">
      <olii-base-icon [size]="size" [name]="name"></olii-base-icon>
    </olii-colored-square-background>
  `,
  styleUrls: ['./icon-with-off-white-square-background.component.scss']
})
export class IconWithOffWhiteSquareBackgroundComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  @Input() size: string;

  /** Name of the icon */
  @Input() name: string;
}
