import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsFeaturePage } from './groups-feature.page';

describe('GroupsFeaturePage', () => {
  let component: GroupsFeaturePage;
  let fixture: ComponentFixture<GroupsFeaturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsFeaturePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsFeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
