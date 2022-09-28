import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { EventsFeatureStore } from 'src/app/shared/services/community/events-feature/events-feature.store';

@Component({
  templateUrl: './event-attendees.page.html',
  styleUrls: ['./event-attendees.page.scss']
})
export class EventAttendeesPage implements OnInit {
  eventAttendees$: Observable<ProfilePreview[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventStore: EventsFeatureStore
  ) { }

  ngOnInit(): void {
    this.eventAttendees$ = this.eventStore.getEventAttendees(this.route.snapshot.paramMap.get('eventId'));
  }

  navigateToProfile(profileId: string): void {
    this.router.navigate(['profile'], { queryParams: { profileId: profileId, showBackButton: true } });
  }

  navigateBack(): void {
    this.router.navigate(['community/events', this.route.snapshot.paramMap.get('eventId')])
  }
}
