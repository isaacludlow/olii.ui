import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsFeatureComponent } from './groups-feature.component';

describe('GroupsFeatureComponent', () => {
  let component: GroupsFeatureComponent;
  let fixture: ComponentFixture<GroupsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
