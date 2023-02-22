import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent } from './collapsible-purple-header-with-one-button-section-two.component';

describe('CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent', () => {
  let component: CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent;
  let fixture: ComponentFixture<CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblePurpleHeaderWithOneButtonSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
