import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/dto/community/events/event.dto';

@Component({
  selector: 'olii-event-card-list',
  template: `
    <div *ngIf="events$ | async as events">
      <div *ngIf="events.length === 0" class="no-events">
        <p class="color-medium">{{ alternativeText }}</p>
      </div>

      <div  class="card-wrapper" *ngFor="let event of events">
        <olii-event-card [event]="event" [routerLink]="['/community/events', event.EventId]"></olii-event-card>
      </div>
    </div>
  `,
  styleUrls: ['./event-card-list.component.scss']
})
export class EventCardListComponent {
  @Input() events$: Observable<Event[]>;
  @Input() alternativeText: string;

}
