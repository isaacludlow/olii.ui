import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPage } from './create-event.page';

describe('CreateEventPage', () => {
  let component: CreateEventPage;
  let fixture: ComponentFixture<CreateEventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
