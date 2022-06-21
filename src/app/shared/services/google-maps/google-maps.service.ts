import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlacesAutocompleteResult } from 'src/app/models/dto/google-maps/places-autocomplete-result.dto';
import gm = google.maps;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private autocompleteSessionToken = new gm.places.AutocompleteSessionToken();
  private autocompleteService = new gm.places.AutocompleteService();

  getAutoCompleteSuggestions(searchCharacters: string, restrictions: any): Observable<PlacesAutocompleteResult[]> {
    return new Observable(observer => {
      if (!searchCharacters) {
        return observer.next([]);
      }

      // this.autocompleteService.getPlacePredictions()
    });
  }
}
