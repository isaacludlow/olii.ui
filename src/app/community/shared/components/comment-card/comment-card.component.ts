import { Component, Input, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupPostCommentRequest } from 'src/app/models/requests/community/groups/group-post-comment-request';
import { GroupService } from 'src/app/shared/services/community/groups/group.service';

@Component({
  selector: 'olii-comment-card',
  template: `
    <div>
        <div class="card-content">
            <div class="post-header">
                <div class="poster-info">
                    <div class="poster-image">
                        <!-- TODO: Should be a routerlink to the posters profile(?) -->
                        <olii-container-cover-image [imageUrl]="post.Author.ProfilePictureUrl" boarderRadius="50%"></olii-container-cover-image>
                    </div>
                    <div class="poster-name">{{post.Author.FirstName}} {{post.Author.LastName}}</div>
                </div>
                <div>{{post.Date.toDateString()}}</div>
            </div>
            {{post.Content}}
            <div class="post-images">
                <olii-responsive-aspect-ratio-container *ngFor="let image of post.ImageUrls" aspectRatio="1/1" class="image-container">
                    <olii-container-cover-image [imageUrl]="image" boarderRadius="5px"></olii-container-cover-image>
                </olii-responsive-aspect-ratio-container>
            </div>

            <div class="comments-container" *ngIf="post.Comments.length > 0">
                <hr>
                <div *ngIf="showComments">
                    <div class="post-comment" *ngFor="let comment of post.Comments">
                        <div class="post-comment-content">
                            <div class="poster-image">
                                <olii-container-cover-image [imageUrl]="comment.Author.ProfilePictureUrl" boarderRadius="50%"></olii-container-cover-image>
                            </div>
                        {{ comment.Content }}
                        </div>
                        <hr>
                    </div>

                    <div class="toggle-show-comments-text" (click)="toggleShowComments()">
                        Hide Comments
                    </div>
                </div>

                <div class="toggle-show-comments-text" *ngIf="!showComments" (click)="toggleShowComments()"> 
                    Show Comments
                </div>
            </div>

            <div *ngIf="!showAddComment" class="comment-icon">
                <olii-icon-with-off-white-square-background (click)="toggleAddComment(true)" name="chatbox-ellipses-outline"></olii-icon-with-off-white-square-background>
            </div>

            <div class="add-comment-content" *ngIf="showAddComment">
                <div class="poster-image">
                    <olii-container-cover-image [imageUrl]="currentUser.ProfilePictureUrl" boarderRadius="50%"></olii-container-cover-image>
                </div>
                <ion-item class="comment-textbox">
                    <ion-input [formControl]="addCommentInput" type="text" maxlength="50" placeholder="Add comment..."></ion-input>
                </ion-item>
                <div class="icon">
                    <olii-icon-with-off-white-square-background size="medium" name="close-circle-outline" (click)="cancelComment()"></olii-icon-with-off-white-square-background>
                </div>
                <div class="icon">
                    <olii-icon-with-off-white-square-background size="medium" name="send" (click)="sendComment()"></olii-icon-with-off-white-square-background>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./comment-card.component.scss'],

})
export class CommentCardComponent implements OnInit {
  @Input() post: GroupPost;
  @Input() groupId: number;
  @Input() currentUser: Profile;
  
  showAddComment: boolean;
  showComments: boolean;
  addCommentInput = new FormControl('', Validators.required);

  constructor( 
    private groupService: GroupService
   ) { }

  ngOnInit(): void {
    this.showAddComment = false;
    this.showComments = false;
  }

  toggleAddComment(set: boolean) {
    this.showAddComment = set;
  }

  cancelComment() {
    this.addCommentInput = new FormControl('', Validators.required);
    this.toggleAddComment(false);
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }

  sendComment() {
    if (!this.addCommentInput.invalid) {
        const newComment: GroupPostCommentRequest = {
            OriginGroup: this.groupId,
            ParentId: this.post.Id,
            Author: this.currentUser,
            Content: this.addCommentInput.value,
            Date: new Date(Date.now()),
        }
    
        this.groupService.addCommentToGroupPost(newComment).subscribe(res => {
            this.addCommentInput = new FormControl('', Validators.required);
            this.toggleAddComment(false);
        });
    }
  }

}
