import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store'
import { CommentsComponent } from '../comments/comments.component'

@Component({
  selector: 'olii-group-post-card',
  template: `
    <div>
        <div class="card-content">
            <div class="post-header">
                <div class="poster-info" (click)="navigateToUserProfile(post.Author.ProfileId)">
                    <div class="poster-image">
                        <olii-container-cover-image [imageUrl]="post.Author.ProfilePictureUrl" boarderRadius="50%"></olii-container-cover-image>
                    </div>
                    <div class="poster-name">{{post.Author.FirstName}} {{post.Author.LastName}}</div>
                </div>
                <div class="post-datetime">
                    <ion-text class="font-body-xs" color="medium">{{post.Date | date:'EE MMM d' }}</ion-text>
                    <ion-text class="font-body-xs" color="medium">{{post.Date | date:'h:mm a' }}</ion-text>
                </div>
            </div>
            {{post.Content}}
            <div *ngIf="post.ImageUrls.length > 0" class="post-images">

              <ion-thumbnail *ngIf="post.ImageUrls.length === 1">
                <ion-img [src]="post.ImageUrls[0]"></ion-img>
              </ion-thumbnail>

              <ion-slides *ngIf="post.ImageUrls.length > 1" pager="true">
                <ion-slide *ngFor="let imageUrl of post.ImageUrls">
                  <ion-thumbnail>
                    <ion-img [src]="imageUrl"></ion-img>
                  </ion-thumbnail>
                </ion-slide>
              </ion-slides>

            </div>
            <olii-comments [postComments]="post.Comments" [groupPostId]="post.GroupPostId"></olii-comments>
        </div>
    </div>
  `,
  styleUrls: ['./group-post-card.component.scss'],

})
export class GroupPostCardComponent implements OnInit {
  @ViewChild (CommentsComponent) comments: CommentsComponent;
  @Input() post: GroupPost;
  showPostImageSlidePager: boolean;
  
  constructor( 
    private router: Router,
    private groupStore: GroupFeatureStore
   ) { }
   
   ngOnInit(): void {
    this.groupStore.getCommentsByGroupPostId(this.post.GroupPostId).subscribe(comments => this.post.Comments = comments);
    this.showPostImageSlidePager = this.post.ImageUrls.length > 0;
   }

  navigateToUserProfile(profileId: string) {
    this.router.navigate(['/profile'], { queryParams: { profileId: profileId, showBackButton: true } })
  }
}
