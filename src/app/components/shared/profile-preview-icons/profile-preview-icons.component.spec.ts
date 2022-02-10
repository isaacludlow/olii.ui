import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviewIconsComponent } from './profile-preview-icons.component';

describe('ProfilePreviewIconsComponent', () => {
  let component: ProfilePreviewIconsComponent;
  let fixture: ComponentFixture<ProfilePreviewIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePreviewIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePreviewIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
