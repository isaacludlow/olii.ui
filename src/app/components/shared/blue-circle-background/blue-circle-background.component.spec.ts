import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueCircleBackgroundComponent } from './blue-circle-background.component';

describe('BlueCircleBackgroundComponent', () => {
  let component: BlueCircleBackgroundComponent;
  let fixture: ComponentFixture<BlueCircleBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueCircleBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueCircleBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
