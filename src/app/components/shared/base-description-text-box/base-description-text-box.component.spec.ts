import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDescriptionTextBoxComponent } from './base-description-text-box.component';

describe('BaseDescriptionTextBoxComponent', () => {
  let component: BaseDescriptionTextBoxComponent;
  let fixture: ComponentFixture<BaseDescriptionTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDescriptionTextBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDescriptionTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
