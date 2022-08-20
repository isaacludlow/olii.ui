import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupsPage } from './my-groups.page';

describe('MyGroupsPage', () => {
  let component: MyGroupsPage;
  let fixture: ComponentFixture<MyGroupsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGroupsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
