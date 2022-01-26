import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseCardComponent } from './base-card.component';

describe('BaseIconComponent', () => {
  let component: BaseCardComponent;
  let fixture: ComponentFixture<BaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should add the "download" attribute', () => {
      // arrange
      component.setDownloadAttribute = true;

      // act
      component.ngAfterViewInit();

      // assert
      const ionCardEl = fixture.debugElement.query(By.css('ion-card'));
      expect(ionCardEl.attributes).toContain['download'];
    });

    it('should add the "download" attribute with file name', () => {
      // arrange
      component.setDownloadAttribute = true;
      component.downloadFileName = 'asdf';

      // act
      component.ngAfterViewInit();

      // assert
      const ionCardEl = fixture.debugElement.query(By.css('ion-card'));
      expect(ionCardEl.attributes['download']).toEqual(component.downloadFileName);
    });
  });
});
