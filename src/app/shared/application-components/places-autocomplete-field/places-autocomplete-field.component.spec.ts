import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesAutocompleteFieldComponent } from './places-autocomplete-field.component';

describe('PlacesAutocompleteFieldComponent', () => {
  let component: PlacesAutocompleteFieldComponent;
  let fixture: ComponentFixture<PlacesAutocompleteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesAutocompleteFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesAutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
