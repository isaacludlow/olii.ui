import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
export class ToggleItemComponent {
  @Input() toggled: boolean;
  @Output() newToggledEvent = new EventEmitter<boolean>();

  toggle(): void {
    this.toggled = !this.toggled;
    this.newToggledEvent.emit(this.toggled);
  }
}
