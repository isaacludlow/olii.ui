import { TestBed } from '@angular/core/testing';

import { EventsFeatureService } from './events-feature.service';

describe('EventsFeatureService', () => {
  let service: EventsFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
