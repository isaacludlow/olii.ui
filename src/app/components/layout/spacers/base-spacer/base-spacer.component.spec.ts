import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSpacerComponent } from './base-spacer.component';

describe('BaseSpacerComponent', () => {
  let component: BaseSpacerComponent;
  let fixture: ComponentFixture<BaseSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSpacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
