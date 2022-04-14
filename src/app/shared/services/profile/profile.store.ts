import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators"
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { convertBlobToBase64 } from "../../utilities";
import { ProfileService } from "./profile.service";

@Injectable({
	providedIn: 'root'
})
export class ProfileStore {
	private profile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

	constructor(private profileService: ProfileService, private httpClient: HttpClient) {}

	getProfileById(profileId: number): Observable<Profile> {
		if (!(this.profile$.value)) {
			return this.profileService.getProfileById(profileId).pipe(tap(profile => this.profile$.next(profile)));
		}
		else {
			return this.profile$.asObservable();
		}

		// Use this code below for caching images in the future.
			// .pipe(
			// 	map(profile => {
			// 		profile.ProfileImages.forEach(img => {
			// 			this.getBase64Image(img.Url).pipe(map(imageData => img.DownloadedImage = imageData)).subscribe();
			// 		});

			// 		return profile;
			// 	})
			// );
	}

	getBase64Image(url: string) {
		return this.httpClient.get(url, { observe: 'response', responseType: 'blob' }).pipe(switchMap(res => from(convertBlobToBase64(res.body))));
	}
}
