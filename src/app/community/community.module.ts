import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './shared/components/cards/event-card/event-card.component';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { SharedModule } from '../shared/shared.module';
import { GroupPostCardComponent } from './shared/components/cards/group-post-card.component/group-post-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { GroupCardComponent } from './shared/components/cards/group-card/group-card.component';
import { EventCardListComponent } from './shared/components/cards/event-card-list/event-card-list.component'


@NgModule({
  declarations: [
    CommunityComponent,
    EventCardComponent,
    GroupPostCardComponent,
    CommentsComponent,
    GroupCardComponent,
    EventCardListComponent
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
    GroupPostCardComponent,
    GroupCardComponent,
    EventCardListComponent
  ]
})
export class CommunityModule { }
