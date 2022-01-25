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
      // const hasDownloadAttribute = fixture.debugElement.properties.innerHTML.Contains('download');
      // console.log(fixture.debugElement.nativeElement)
      // console.log(fixture.debugElement.attributes)
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
      // const downloadAttributeValue = fixture.debugElement.nativeElement.getAttribute('download');
      expect(ionCardEl.attributes['download']).toEqual(component.downloadFileName);
    });
  });
});
