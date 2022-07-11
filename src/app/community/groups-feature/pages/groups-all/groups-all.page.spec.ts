import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAllPage } from './groups-all.page';

describe('GroupsAllPage', () => {
  let component: GroupsAllPage;
  let fixture: ComponentFixture<GroupsAllPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsAllPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
