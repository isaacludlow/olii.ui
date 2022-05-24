import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationSlideshowPage } from './registration-slideshow.page';

describe('RegistrationSlideshowPage', () => {
  let component: RegistrationSlideshowPage;
  let fixture: ComponentFixture<RegistrationSlideshowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSlideshowPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSlideshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
