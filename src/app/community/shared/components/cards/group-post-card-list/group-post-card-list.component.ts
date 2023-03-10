import { Component, Input } from '@angular/core';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';

@Component({
  selector: 'olii-group-post-card-list',
  template: `
    <div *ngIf="posts">
      <div *ngIf="posts.length === 0" class="no-posts">
        <p class="color-medium">{{ alternativeText }}</p>
      </div>

      <div class="card-wrapper" *ngFor="let post of posts">
        <olii-group-post-card [post]="post"></olii-group-post-card>
      </div>
    </div>
  `,
  styleUrls: ['./group-post-card-list.component.scss']
})
export class GroupPostCardListComponent {
  @Input() posts: GroupPost[];
  @Input() alternativeText: string;
}
