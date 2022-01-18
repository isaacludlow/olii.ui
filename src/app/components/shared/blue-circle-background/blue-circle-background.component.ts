import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blue-circle-background',
  templateUrl: './blue-circle-background.component.html',
  styleUrls: ['./blue-circle-background.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlueCircleBackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
