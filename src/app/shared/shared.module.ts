import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PlacesAutocompleteFieldComponent } from './application-components/places-autocomplete-field/places-autocomplete-field.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    TruncatePipe,
    PlacesAutocompleteFieldComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TruncatePipe,
    PlacesAutocompleteFieldComponent
  ]
})
export class SharedModule { }
