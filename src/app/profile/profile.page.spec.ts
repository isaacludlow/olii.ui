import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Profile } from '../models/dto/profile/profile.dto';
import { ProfileStore } from '../shared/services/profile/profile.store';

import { ProfilePage } from './profile.page';

class MockProfileStore {
  getProfileById() {
    return of(<Profile>{});
  }
}

describe('ProfileComponent', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      providers: [
        { provide: ProfileStore, useClass: MockProfileStore}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
