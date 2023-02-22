import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePurpleHeaderWithOneButtonSectionOneComponent } from './collapsible-purple-header-with-one-button-section-one.component';

describe('CollapsiblePurpleHeaderWithOneButtonSectionOneComponent', () => {
  let component: CollapsiblePurpleHeaderWithOneButtonSectionOneComponent;
  let fixture: ComponentFixture<CollapsiblePurpleHeaderWithOneButtonSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsiblePurpleHeaderWithOneButtonSectionOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblePurpleHeaderWithOneButtonSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
