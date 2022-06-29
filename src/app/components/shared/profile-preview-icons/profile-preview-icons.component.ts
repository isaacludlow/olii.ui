import { Component, Input } from '@angular/core';

@Component({
  selector: 'olii-profile-preview-icons',
  template: `
    <div class="profile-icons-container" [ngClass]="profileIconSize">
      <img class="profile-images" *ngFor="let profileImageUrl of profilePictureUrls" [src]="profileImageUrl">
      <div *ngIf="additionalDisplayNumber && additionalDisplayNumber > 0" class="additional-display-number">{{additionalDisplayNumber}}+</div>
    </div>
  `,
  styleUrls: ['./profile-preview-icons.component.scss']
})
export class ProfilePreviewIconsComponent {
  @Input() profilePictureUrls: Array<string>;
  @Input() profileIconSize: string;
  @Input() additionalDisplayNumber: number = null;
}
