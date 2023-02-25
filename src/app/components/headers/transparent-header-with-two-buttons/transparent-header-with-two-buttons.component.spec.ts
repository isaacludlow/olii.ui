import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentHeaderWithTwoButtonsComponent } from './transparent-header-with-two-buttons.component';

describe('TransparentHeaderWithTwoButtonsComponent', () => {
  let component: TransparentHeaderWithTwoButtonsComponent;
  let fixture: ComponentFixture<TransparentHeaderWithTwoButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransparentHeaderWithTwoButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparentHeaderWithTwoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
