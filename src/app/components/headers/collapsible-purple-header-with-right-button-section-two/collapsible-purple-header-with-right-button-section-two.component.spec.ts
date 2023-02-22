import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent } from './collapsible-purple-header-with-right-button-section-two.component';

describe('CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent', () => {
  let component: CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent;
  let fixture: ComponentFixture<CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblePurpleHeaderWithRightButtonSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
