import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'base-description-text-box',
  template: `
    <div [ngClass]="[textSize, textColor]">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./base-description-text-box.component.scss']
})
export class BaseDescriptionTextBoxComponent implements OnInit {
  @Input() textSize;
  @Input() textColor

  constructor() { }

  ngOnInit(): void {
  }

}
