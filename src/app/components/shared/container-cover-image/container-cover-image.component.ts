import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'container-cover-image',
  template: `
    <img [src]="imageUrl">
  `,
  styleUrls: ['./container-cover-image.component.scss']
})
export class ContainerCoverImageComponent implements OnInit {
  @Input() imageUrl: string;

  ngOnInit(): void {
  }

}
