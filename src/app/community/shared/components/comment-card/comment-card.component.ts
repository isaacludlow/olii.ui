import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { CommentsComponent } from '../comments/comments.component'

@Component({
  selector: 'olii-comment-card', // TODO-AfterBeta: We should rename this to group-post-card, or something like that, and then break out the comment area at the bottom into its own component.
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
            <div class="post-images">
                <olii-responsive-aspect-ratio-container *ngFor="let image of post.ImageUrls" aspectRatio="1/1" class="image-container">
                    <olii-container-cover-image [imageUrl]="image" boarderRadius="5px"></olii-container-cover-image>
                </olii-responsive-aspect-ratio-container>
            </div>
            <olii-comments [post]="post" groupId={{groupId}}></olii-comments>
        </div>
    </div>
  `,
  styleUrls: ['./comment-card.component.scss'],

})
export class CommentCardComponent implements OnInit {
  @ViewChild (CommentsComponent) comments: CommentsComponent;
  @Input() post: GroupPost;
  @Input() groupId: string; // pass this through to comments...comments is now dependant on comment-card so this isn't great
  
  constructor( 
    private router: Router
   ) { }
   
   ngOnInit(): void {
   }

  navigateToUserProfile(profileId: string) {
    this.router.navigate(['/profile'], { queryParams: { profileId: profileId, showBackButton: true } })
  }
}
