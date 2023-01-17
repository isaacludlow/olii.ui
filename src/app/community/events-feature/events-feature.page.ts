import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { EventsFeatureStore, MyEventsFilterOptions } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';
import { SubSink } from 'subsink';

@Component({
  selector: 'events-feature',
  templateUrl: './events-feature.page.html',
  styleUrls: ['./events-feature.page.scss']
})
export class EventsFeaturePage implements OnInit, OnDestroy {
  myEvents$: Observable<Event[]>;
  allEvents$: Observable<Event[]>;
  profile: Profile;
  private subs = new SubSink();

  constructor(
    private eventsStore: EventsFeatureStore,
    private profileStore: ProfileStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileStore.currentProfile.subscribe(profile => {
      // Waits for profile to load after initial login
      if (profile !== null) {
        this.allEvents$ = this.eventsStore.getAllEvents();
        this.myEvents$ = this.eventsStore.getMyEvents(profile.ProfileId, MyEventsFilterOptions.Attending).pipe(map(events => events));
        this.profile = profile;
      }
    });
  }

  createEvent(): void {
    // Creator type is 'Group' when creating an event from a group details page.
    this.router.navigate(
      ['community/events/create'],
      {
        queryParams: {
          creatorType: EventCreatorIdType.Profile,
          creatorId: this.profile.ProfileId,
          creatorDisplayName: `${this.profile.FirstName} ${this.profile.LastName}`,
          imageUrl: this.profile.ProfilePictureUrl
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
