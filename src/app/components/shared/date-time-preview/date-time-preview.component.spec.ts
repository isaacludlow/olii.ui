import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimePreviewComponent } from './date-time-preview.component';

describe('DateTimePreviewComponent', () => {
  let component: DateTimePreviewComponent;
  let fixture: ComponentFixture<DateTimePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTimePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
