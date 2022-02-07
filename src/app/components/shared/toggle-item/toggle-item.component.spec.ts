import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleItemComponent } from './toggle-item.component';

describe('ToggleItemComponent', () => {
  let component: ToggleItemComponent;
  let fixture: ComponentFixture<ToggleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle on and off', () => {
    component.toggled = false;
    fixture.detectChanges();
    expect(component.toggled).toBeFalsy();

    component.toggle();
    fixture.detectChanges();

    expect(component.toggled).toBeTruthy();
  });
});
