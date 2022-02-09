import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurpleSquareBackgroundComponent } from './purple-square-background.component';

describe('PurpleSquareBackgroundComponent', () => {
  let component: PurpleSquareBackgroundComponent;
  let fixture: ComponentFixture<PurpleSquareBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurpleSquareBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurpleSquareBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
