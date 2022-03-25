import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWithPurpleSquareBackgroundComponent } from './icon-with-purple-square-background.component';

describe('IconWithPurpleSquareBackgroundComponent', () => {
  let component: IconWithPurpleSquareBackgroundComponent;
  let fixture: ComponentFixture<IconWithPurpleSquareBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconWithPurpleSquareBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWithPurpleSquareBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
