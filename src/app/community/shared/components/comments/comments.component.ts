import { Component, Input, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupPostCommentRequest } from 'src/app/models/requests/community/groups/group-post-comment-request';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'olii-comments', // TODO-AfterBeta: We should rename this to group-post-card, or something like that, and then break out the comment area at the bottom into its own component.
  template: `
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
            <olii-container-cover-image [imageUrl]="profile.ProfilePictureUrl" boarderRadius="50%"></olii-container-cover-image>
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
  `,
  styleUrls: ['./comments.component.scss'],

})
export class CommentsComponent implements OnInit {
  @Input() post: GroupPost;
  @Input() groupId: string;
  
  profile: Profile;
  showAddComment: boolean;
  showComments: boolean;
  addCommentInput = new FormControl('', Validators.required);

  constructor( 
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
   ) { }

  ngOnInit(): void {
    this.profile = this.profileStore.currentProfile.value;
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
            ParentId: this.post.GroupPostId,
            Author: {
                ProfileId: this.profile.ProfileId,
                FirstName: this.profile.FirstName,
                LastName: this.profile.LastName,
                ProfilePictureUrl: this.profile.ProfilePictureUrl
            },
            Content: this.addCommentInput.value,
            Date: new Date(Date.now()),
        }
    
        this.groupStore.addCommentToGroupPost(newComment).subscribe(res => {
            this.addCommentInput = new FormControl('', Validators.required);
            this.toggleAddComment(false);
        });
    }
  }
}
