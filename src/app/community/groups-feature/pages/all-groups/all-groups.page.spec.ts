import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroupsPage } from './all-groups.page';

describe('AllGroupsPage', () => {
  let component: AllGroupsPage;
  let fixture: ComponentFixture<AllGroupsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGroupsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
