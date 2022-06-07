import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'olii-back-button',
  template: `
    <div>
      <olii-icon-with-purple-square-background name="arrow-back" size="medium"></olii-icon-with-purple-square-background>
    </div>
  `,
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
