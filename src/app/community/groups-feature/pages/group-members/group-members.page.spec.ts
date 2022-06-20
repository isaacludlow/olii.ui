import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMembersPage } from './group-members.page';

describe('GroupMembersPage', () => {
  let component: GroupMembersPage;
  let fixture: ComponentFixture<GroupMembersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMembersPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
