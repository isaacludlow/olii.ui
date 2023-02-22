import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRemSpacerComponent } from './one-rem-spacer.component';

describe('OneRemSpacerComponent', () => {
  let component: OneRemSpacerComponent;
  let fixture: ComponentFixture<OneRemSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneRemSpacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRemSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
