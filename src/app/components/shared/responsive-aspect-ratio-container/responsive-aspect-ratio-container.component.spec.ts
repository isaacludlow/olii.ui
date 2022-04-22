import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveAspectRatioContainerComponent } from './responsive-aspect-ratio-container.component';

describe('ResponsiveAspectRatioContainerComponent', () => {
  let component: ResponsiveAspectRatioContainerComponent;
  let fixture: ComponentFixture<ResponsiveAspectRatioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveAspectRatioContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveAspectRatioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
