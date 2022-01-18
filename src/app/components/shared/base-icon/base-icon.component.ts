import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-base-icon',
  templateUrl: './base-icon.component.html',
  styleUrls: ['./base-icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseIconComponent {
  /** Specifies the css class to be applied to the icon to determine the size. */
  size: string;
  /** Name of the icon */
  name: string;

  constructor() { }

}
