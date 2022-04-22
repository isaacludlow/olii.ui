import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredSquareBackgroundComponent } from './colored-square-background.component';

describe('PurpleSquareBackgroundComponent', () => {
  let component: ColoredSquareBackgroundComponent;
  let fixture: ComponentFixture<ColoredSquareBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoredSquareBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredSquareBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
