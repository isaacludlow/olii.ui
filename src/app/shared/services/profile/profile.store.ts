import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators"
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";
import { convertBlobToBase64 } from "../../utilities";
import { AuthStore } from "../authentication/auth-store";
import { ProfileService } from "./profile.service";

@Injectable({
	providedIn: 'root'
})
export class ProfileStore implements OnDestroy {
	private _profile = new BehaviorSubject<Profile>(null);
	private _manualOverrideForProfileSection = new BehaviorSubject<Section>('photos');
	private subs = new SubSink()
	currentUserProfile: Profile;

	constructor(
		private profileService: ProfileService,
		private authStore: AuthStore,
		private httpClient: HttpClient
	) {
		this.subs.sink = this.authStore.user.pipe(
			switchMap(user => this.profileService.getProfileByUserId(user.Id))
		).subscribe(profile => this.currentUserProfile = profile);
	}

	set profileSection(section: Section) {
		this._manualOverrideForProfileSection.next(section);
	}	

	get profileSection() {
		const currentSection = this._manualOverrideForProfileSection.value;
		this._manualOverrideForProfileSection.next('photos');

		return currentSection;
	}

	getProfileById(profileId: number): Observable<Profile> {
		if (!(this._profile.value)) {
			// TODO-L29: GetProfileById() should match pattern in eventStore.getEventById().
			return this.profileService.getProfileById(profileId).pipe(tap(profile => this._profile.next(profile)));
		}
		else {
			return this._profile.asObservable();
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

	getProfileByUserId(userId: number) {
		return this.profileService.getProfileByUserId(userId).pipe(tap(profile => this._profile.next(profile)));;
	}

	getFriends(userId: number): Observable<PartialProfile[]> {
		return this.profileService.getFriends(userId);
	}

	postNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
		return this.profileService.createNewAlbum(albumName, albumDescription, albumVisibility);
	}

	// getBase64Image(url: string) {
	// 	return this.httpClient.get(url, { observe: 'response', responseType: 'blob' }).pipe(switchMap(res => from(convertBlobToBase64(res.body))));
	// }

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

type Section = 'photos' | 'saved';
