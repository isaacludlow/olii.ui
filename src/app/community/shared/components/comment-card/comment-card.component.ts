import { Component, Input, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { GroupPostCommentRequest } from 'src/app/models/requests/community/groups/group-post-comment-request';
import { GroupFeatureService } from 'src/app/shared/services/community/groups-feature/group-feature.service';
import { GroupFeatureStore } from 'src/app/shared/services/community/groups-feature/group-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'olii-comment-card', // TODO-AfterBeta: We should rename this to group-post-card, or something like that, and then break out the comment area at the bottom into its own component.
  template: `
    <div>
        <div class="card-content">
            <div class="post-header">
                <div class="poster-info" (click)="navigateToUserProfile(post.Author.Id)">
                    <div class="poster-image">
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
        </div>
    </div>
  `,
  styleUrls: ['./comment-card.component.scss'],

})
export class CommentCardComponent implements OnInit {
  @Input() post: GroupPost;
  @Input() groupId: number;
  
  profile: Profile;
  showAddComment: boolean;
  showComments: boolean;
  addCommentInput = new FormControl('', Validators.required);

  constructor( 
    private groupStore: GroupFeatureStore,
    private profileStore: ProfileStore,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.profile = this.profileStore.currentUserProfile;
    this.showAddComment = false;
    this.showComments = false;
  }

  navigateToUserProfile(profileId: number) {
    this.router.navigate(['/profile'], { queryParams: { profileId: profileId, showBackButton: true } })
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
            Author: this.profile,
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
