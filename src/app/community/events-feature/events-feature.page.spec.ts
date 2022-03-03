import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFeaturePage } from './events-feature.page';

describe('EventsFeaturePage', () => {
  let component: EventsFeaturePage;
  let fixture: ComponentFixture<EventsFeaturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsFeaturePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsFeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
