import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'container-cover-image',
  template: `
    <img class="cover-image" [src]="imageUrl">
  `,
  styleUrls: ['./container-cover-image.component.scss']
})
export class ContainerCoverImageComponent {
  @Input() imageUrl: string;
}
