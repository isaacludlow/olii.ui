import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AutocompleteResponseFields, AutocompleteResponseTypes } from 'src/app/models/dto/google-maps/autocomplete-types.dto';
import gm = google.maps;

@Component({
  selector: 'olii-places-autocomplete-field',
  template: `
    <ion-input #searchField clearInput="true" type="text" [placeholder]="placeholder" [value]="textInput"></ion-input>
  `,
  styleUrls: ['./places-autocomplete-field.component.scss']
})
export class PlacesAutocompleteFieldComponent implements OnInit {
  @Input() placeholder: string;
  @Input() textInput: string = null; // This is a quick and dirty way to set the text value when needing to prefill text, such as on the edit event page.
  @Input() responseType: Array<AutocompleteResponseTypes>;
  @Input() responseFieldType: Array<AutocompleteResponseFields>;
  @Output() autocompletedResult = new EventEmitter<gm.places.PlaceResult>();

  @ViewChild('searchField', { static: true }) searchField;
  autocomplete: gm.places.Autocomplete;

  ngOnInit(): void {
    this.searchField.getInputElement().then(inputElement => {
      this.autocomplete = new gm.places.Autocomplete(inputElement);

      this.autocomplete.setOptions({
        types: [...this.responseType],
        fields: [...this.responseFieldType]
      });

      this.autocomplete.addListener('place_changed', () => {
        this.autocompletedResult.emit(this.autocomplete.getPlace());
      });
    });
  }
}
