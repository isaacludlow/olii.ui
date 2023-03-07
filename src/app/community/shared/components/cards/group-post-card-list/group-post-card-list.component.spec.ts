import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostCardListComponent } from './group-post-card-list.component';

describe('GroupPostCardListComponent', () => {
  let component: GroupPostCardListComponent;
  let fixture: ComponentFixture<GroupPostCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPostCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPostCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
