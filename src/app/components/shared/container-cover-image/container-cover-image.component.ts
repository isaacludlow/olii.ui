import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'olii-container-cover-image',
  template: `
    <img class="cover-image" [ngClass]="{ 'circle-image': circle }" [src]="imageUrl">
  `,
  styleUrls: ['./container-cover-image.component.scss']
})
export class ContainerCoverImageComponent {
  @Input() imageUrl: string;
  @Input() circle: string;
}
