import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePurpleHeaderWithRightButtonSectionOneComponent } from './collapsible-purple-header-with-right-button-section-one.component';

describe('CollapsiblePurpleHeaderWithRightButtonSectionOneComponent', () => {
  let component: CollapsiblePurpleHeaderWithRightButtonSectionOneComponent;
  let fixture: ComponentFixture<CollapsiblePurpleHeaderWithRightButtonSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsiblePurpleHeaderWithRightButtonSectionOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblePurpleHeaderWithRightButtonSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
