import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap } from "rxjs/operators"
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";
import { convertBlobToBase64 } from "../../utilities";
import { AuthStore } from "../authentication/auth-store";
import { ProfileService } from "./profile.service";
import { ProfileRequest } from "src/app/models/requests/profile/profile-request";
import { UserStore } from "../user/user.store";

@Injectable({
	providedIn: 'root'
})
export class ProfileStore implements OnDestroy {
	private _manualOverrideForProfileSection = new BehaviorSubject<Section>('photos');
	private subs = new SubSink()
	currentUserProfile: Profile;

	constructor(
		private profileService: ProfileService,
		private userStore: UserStore,
		private httpClient: HttpClient
	) {
		this.subs.sink = this.userStore.user.pipe(
			switchMap(user => this.profileService.getProfileByUserId(user?.Id))
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
		return this.profileService.getProfileById(profileId);

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

	getFriends(userId: number): Observable<PartialProfile[]> {
		return this.profileService.getFriends(userId);
	}

	postNewAlbum(albumName: string, albumDescription: string, albumVisibility: string) {
		return this.profileService.createNewAlbum(albumName, albumDescription, albumVisibility);
	}

	updateProfile(profileRequest: ProfileRequest) {
		return this.profileService.updateProfile(profileRequest);
	}

	// getBase64Image(url: string) {
	// 	return this.httpClient.get(url, { observe: 'response', responseType: 'blob' }).pipe(switchMap(res => from(convertBlobToBase64(res.body))));
	// }

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

type Section = 'photos' | 'saved';
