import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-profile-preview-icons',
  template: `
    <div class="profile-icons-container">
      <img class="profile-images" [ngClass]="profileIconSize" *ngFor="let profileImageUrl of profilePictureUrls" [src]="profileImageUrl">
    </div>
  `,
  styleUrls: ['./profile-preview-icons.component.scss']
})
export class ProfilePreviewIconsComponent {
  @Input() profilePictureUrls: Array<string>;
  @Input() profileIconSize: string;
  // @Input() additionDisplayNumber: number = null; // TODO: Show and hide the addition number to display next to the profile preview icons.
}
