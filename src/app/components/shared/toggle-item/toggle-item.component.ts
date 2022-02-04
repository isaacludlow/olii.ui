import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toggle-item',
  template: `
    <div class="toggle" (click)="toggle()">
      <ng-content *ngIf="!toggled" select="[toggleOff]"></ng-content>
      <ng-content *ngIf="toggled" select="[toggleOn]"></ng-content>
    </div>
  `,
  styleUrls: ['./toggle-item.component.scss']
})
export class ToggleItemComponent implements OnInit {
  @Input() toggled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
