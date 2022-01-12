import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseIconComponent } from './base-icon.component';

describe('BaseIconComponent', () => {
  let component: BaseIconComponent;
  let fixture: ComponentFixture<BaseIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
