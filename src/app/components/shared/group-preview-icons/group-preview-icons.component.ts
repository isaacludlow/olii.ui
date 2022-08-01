import { Component, Input } from '@angular/core';
import { PartialGroup } from 'src/app/models/dto/community/groups/partial-group.dto';

@Component({
  selector: 'olii-group-preview-icons',
  template: `
    <div class="group-icons-container" [ngClass]="groupIconSize">
      <div class="group-link" *ngFor="let group of groups">
      <div class="group-image">
        <olii-container-cover-image [imageUrl]="group.CoverImageUrl" boarderRadius="50%" [routerLink]="['./group', group.GroupId]"></olii-container-cover-image>
        </div>
          <div class="group-nav-group-name">{{ group.GroupName }}</div>
        </div>
      <div *ngIf="additionalDisplayNumber && additionalDisplayNumber > 0" class="additional-display-number">{{additionalDisplayNumber}}+</div>
    </div>
  `,
  styleUrls: ['./group-preview-icons.component.scss']
})
export class GroupPreviewIconsComponent {
  @Input() groups: Array<PartialGroup>;
  @Input() groupIconSize: string;
  @Input() additionalDisplayNumber: number = null;

  constructor() { }

  ngOnInit(): void {
  }
}
