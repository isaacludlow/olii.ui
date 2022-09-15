import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";
import { ProfileService } from "./profile.service";
import { ProfileRequest } from "src/app/models/requests/profile/profile-request";
import { UserStore } from "../user/user.store";
import { ProfileRequestSavedAlbum } from "src/app/models/requests/profile/profile-request-saved-album";

@Injectable({
	providedIn: 'root'
})
export class ProfileStore implements OnDestroy {
	private _manualOverrideForProfileSection = new BehaviorSubject<Section>('photos');
	private subs = new SubSink()
	currentProfile = new BehaviorSubject<Profile>(null);

	constructor(
		private profileService: ProfileService,
		private userStore: UserStore
	) {
		//this.subs.sink = this.userStore.user.pipe(
		//	switchMap(user => this.profileService.getProfileByUserId(user?.Id))
		//).subscribe(profile => this.currentProfile.next(profile));

		this.userStore.user.subscribe(async user => {
			if (user !== null) {
				let profile = await this.profileService.getProfileByUserId(user.UserId).toPromise();
				this.currentProfile.next(profile);
			}
		});
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
		return this.profileService.getProfileById(profileId).pipe();

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

	getProfileByUserId(userId: number): Observable<Profile> {
		return this.profileService.getProfileByUserId(userId);
	}

	updateProfile(profileId: number, profileRequest: ProfileRequest): Observable<Profile> {
		return this.profileService.updateProfile(profileId, profileRequest);
	}

	getFriends(userId: number): Observable<PartialProfile[]> {
		return this.profileService.getFriends(userId);
	}

	createAlbum(newAlbum: ProfileRequestSavedAlbum) {
		return this.profileService.createAlbum(newAlbum);
	}

	// getBase64Image(url: string) {
	// 	return this.httpClient.get(url, { observe: 'response', responseType: 'blob' }).pipe(switchMap(res => from(convertBlobToBase64(res.body))));
	// }

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

type Section = 'photos' | 'saved';
