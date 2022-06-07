import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMainPage } from './group-main.page';

describe('GroupMainPage', () => {
  let component: GroupMainPage;
  let fixture: ComponentFixture<GroupMainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMainPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
