import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-container-cover-image',
  template: `
    <img class="cover-image" [ngStyle]="{ 'border-radius': boarderRadius }" [src]="imageUrl">
  `,
  styleUrls: ['./container-cover-image.component.scss']
})
export class ContainerCoverImageComponent {
  @Input() imageUrl: string;
  @Input() boarderRadius: string;
}
