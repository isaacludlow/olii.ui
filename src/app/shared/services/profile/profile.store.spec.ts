import { TestBed } from '@angular/core/testing';
import { ProfileStore } from './profile.store';

describe('ProfileService', () => {
  let service: ProfileStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileStore);
  });
});