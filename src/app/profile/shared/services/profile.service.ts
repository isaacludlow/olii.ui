import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/dto/profile/profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileById(id: number): Observable<Profile> {
    var res = this.http.get<Profile>(`https://fb1efce7-c7a4-4bea-abfa-20453e873fd9.mock.pstmn.io/profile/${id}`);

    // Validation stuff

    return res;
  }
}
