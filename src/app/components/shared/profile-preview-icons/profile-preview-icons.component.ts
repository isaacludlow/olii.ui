import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-preview-icons',
  template: `
    <div class="profile-icons-container">
      <img class="profile-images" [ngClass]="profileIconSize" *ngFor="let profileImageUrl of profileImageUrls" [src]="profileImageUrl">
    </div>
  `,
  styleUrls: ['./profile-preview-icons.component.scss']
})
export class ProfilePreviewIconsComponent {
  @Input() profileImageUrls: Array<string>;
  @Input() profileIconSize: string;
}
