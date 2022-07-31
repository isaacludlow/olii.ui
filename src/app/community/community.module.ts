import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { SharedModule } from '../shared/shared.module';
import { CommentCardComponent } from './shared/components/comment-card/comment-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommunityComponent,
    EventCardComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    IonicModule,
    ScrollingModule,
    SharedComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EventCardComponent,
    CommentCardComponent
  ]
})
export class CommunityModule { }
