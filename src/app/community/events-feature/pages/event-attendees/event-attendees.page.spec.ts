import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendeesPage } from './event-attendees.page';

describe('EventAttendeesPage', () => {
  let component: EventAttendeesPage;
  let fixture: ComponentFixture<EventAttendeesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAttendeesPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
