import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImageViewerComponent } from './fullscreen-image-viewer.component';

describe('FullscreenImageViewerComponent', () => {
  let component: FullscreenImageViewerComponent;
  let fixture: ComponentFixture<FullscreenImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenImageViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
