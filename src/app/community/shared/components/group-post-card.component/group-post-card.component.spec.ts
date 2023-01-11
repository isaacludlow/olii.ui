import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostCardComponent } from './group-post-card.component';

describe('CommentCardComponent', () => {
  let component: GroupPostCardComponent;
  let fixture: ComponentFixture<GroupPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
