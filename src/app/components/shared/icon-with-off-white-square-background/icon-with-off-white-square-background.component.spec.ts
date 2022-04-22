import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWithOffWhiteSquareBackgroundComponent } from './icon-with-off-white-square-background.component';

describe('IconWithOffWhiteSquareBackgroundComponent', () => {
  let component: IconWithOffWhiteSquareBackgroundComponent;
  let fixture: ComponentFixture<IconWithOffWhiteSquareBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconWithOffWhiteSquareBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWithOffWhiteSquareBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
