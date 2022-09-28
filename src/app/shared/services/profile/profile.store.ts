import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { ProfileService } from "./profile.service";
import { ProfileRequest } from "src/app/models/requests/profile/profile-request";
import { UserStore } from "../user/user.store";
import { ProfileRequestSavedAlbum } from "src/app/models/requests/profile/profile-request-saved-album";
import { DatabaseService } from "../bankend/database-service/database-service.service";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { SavedImagesAlbum } from "src/app/models/dto/profile/saved-images-album.dto";

@Injectable({
	providedIn: 'root'
})
export class ProfileStore implements OnDestroy {
	private _manualOverrideForProfileSection = new BehaviorSubject<Section>('photos');
	private subs = new SubSink()
	currentProfile = new BehaviorSubject<Profile>(null);

	constructor(
		private profileService: ProfileService,
		private dbService: DatabaseService,
		private userStore: UserStore
	) {
		this.subs.sink = this.userStore.user.subscribe(user => {
			if (user !== null) {
				this.dbService.getProfileById(user.Uid).subscribe(profile => this.currentProfile.next(profile));
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

	getProfileById(profileId: string): Observable<Profile> {
		return this.dbService.getProfileById(profileId).pipe();

		// Use this code below for caching profile images on device in the future since they don't change very often.
		// .pipe(
		// 	map(profile => {
		// 		profile.ProfileImages.forEach(img => {
		// 			this.getBase64Image(img.Url).pipe(map(imageData => img.DownloadedImage = imageData)).subscribe();
		// 		});

		// 		return profile;
		// 	})
		// );
	}

	updateProfile(profileId: string, profileRequest: ProfileRequest): Observable<Profile> {
		return this.profileService.updateProfile(profileId, profileRequest);
	}

	getFriends(userId: number): Observable<ProfilePreview[]> {
		return this.profileService.getFriends(userId);
	}

	createAlbum(newAlbum: ProfileRequestSavedAlbum) {
		return this.profileService.createAlbum(newAlbum);
	}

	getSavedImagesAlbum(profileId: string, savedImagesAlbumId: string): Observable<SavedImagesAlbum>{
		return this.dbService.getSavedImagesAlbum(profileId, savedImagesAlbumId);
	}

	// getBase64Image(url: string) {
	// 	return this.httpClient.get(url, { observe: 'response', responseType: 'blob' }).pipe(switchMap(res => from(convertBlobToBase64(res.body))));
	// }

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

type Section = 'photos' | 'saved';
