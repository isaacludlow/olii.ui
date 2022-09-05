import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { EventCreatorIdType } from 'src/app/models/dto/misc/entity-preview-id-type.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { EventsFeatureStore, MyEventsFilterOptions } from 'src/app/shared/services/community/events-feature/events-feature.store';
import { ProfileStore } from 'src/app/shared/services/profile/profile.store';

@Component({
  selector: 'events-feature',
  templateUrl: './events-feature.page.html',
  styleUrls: ['./events-feature.page.scss']
})
export class EventsFeaturePage implements OnInit {
  myEvents$: Observable<Event[]>;
  allEvents$: Observable<Event[]>;
  profile: Profile;

  constructor(
    private eventsStore: EventsFeatureStore,
    private profileStore: ProfileStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Waits for profile to load after initial login
    this.profileStore.currentProfile.subscribe(profile => {
      if (profile !== null) {
        this.allEvents$ = this.eventsStore.getEvents();
        this.myEvents$ = this.eventsStore.getMyEvents(profile?.ProfileId, MyEventsFilterOptions.Attending).pipe(map(events => events.slice(0, 1)));
        this.profile = profile;
      }
    });
  }

  createEvent(): void {
    // Creator type is 'Group' when creating an event from a group details page.
    this.router.navigate(
      ['community/events/create'],
      { queryParams: { creatorType: EventCreatorIdType.Profile, creatorId: this.profile.ProfileId } }
    );
  }
}
