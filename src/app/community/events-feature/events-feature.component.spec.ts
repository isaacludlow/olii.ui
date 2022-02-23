import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFeatureComponent } from './events-feature.component';

describe('EventsFeatureComponent', () => {
  let component: EventsFeatureComponent;
  let fixture: ComponentFixture<EventsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
