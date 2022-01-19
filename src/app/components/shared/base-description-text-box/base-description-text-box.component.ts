import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'base-description-text-box',
  templateUrl: './base-description-text-box.component.html',
  styleUrls: ['./base-description-text-box.component.scss']
})
export class BaseDescriptionTextBoxComponent implements OnInit {
  @Input() textSize;
  @Input() textColor

  constructor() { }

  ngOnInit(): void {
  }

}
