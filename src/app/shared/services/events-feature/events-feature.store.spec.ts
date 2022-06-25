import { TestBed } from '@angular/core/testing';
import { EventsFeatureStore } from './events-feature.store';

describe('ProfileService', () => {
  let service: EventsFeatureStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsFeatureStore);
  });
});