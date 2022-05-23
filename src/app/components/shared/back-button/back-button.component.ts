import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'olii-back-button',
  template: `
    <div>
      <olii-base-icon name="arrow-back" color="primary" size="medium"></olii-base-icon>
    </div>
  `,
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
