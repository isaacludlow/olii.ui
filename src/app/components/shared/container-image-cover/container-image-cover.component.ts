import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'container-image-cover',
  template: `
    <img [src]="imageUrl">
  `,
  styleUrls: ['./container-image-cover.component.scss']
})
export class ContainerImageCoverComponent implements OnInit {
  @Input() imageUrl: string;

  ngOnInit(): void {
  }

}
