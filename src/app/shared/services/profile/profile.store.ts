import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, from, Observable, zip } from "rxjs";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { ProfileService } from "./profile.service";
import { ProfileRequest } from "src/app/models/requests/profile/profile-request";
import { UserStore } from "../user/user.store";
import { ProfileRequestSavedAlbum } from "src/app/models/requests/profile/profile-request-saved-album";
import { DatabaseService } from "../bankend/database-service/database.service";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { SavedImagesAlbum } from "src/app/models/dto/profile/saved-images-album.dto";
import { GalleryPhoto } from "@capacitor/camera";
import { Platform } from "@ionic/angular";
import { switchMap } from "rxjs/operators";
import { readPhotoAsBase64 } from "../../utilities";
import { CloudStorageService } from "../bankend/cloud-storage-service/cloud-storage.service";
import { v4 as uuidv4 } from 'uuid';

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
		private userStore: UserStore,
        private cloudStorageService: CloudStorageService
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
		return this.dbService.getProfileById(profileId);

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

	uploadProfilePicture(coverImage: GalleryPhoto, profileId: string, platform: Platform): Observable<string> {
        return from(readPhotoAsBase64(coverImage, platform)).pipe(
          switchMap(imageData => this.cloudStorageService.uploadFile(imageData, `profiles/${profileId}/profile-picture`)),
          switchMap(uploadFileObservable => uploadFileObservable.DownloadUrl$)
        );
    }

	uploadProfileImages(images: GalleryPhoto[], profileId: string, platform: Platform): Observable<string[]> {
		const base64ImageObservables = images.map(image => from(readPhotoAsBase64(image, platform)));
	
		const downloadUrls$ = zip(...base64ImageObservables).pipe(
		  switchMap(base64Images =>
			zip(...base64Images.map(imageData => this.cloudStorageService.uploadFile(imageData, `profiles/${profileId}/images/${uuidv4()}`)))
		  ),
		  switchMap(uploadFileObservables => zip(...uploadFileObservables.map(x => x.DownloadUrl$)))
		);
	
		return downloadUrls$;
	}

	updateProfile(profile: Profile): Observable<void> {
		return this.dbService.updateProfile(profile);
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

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

type Section = 'photos' | 'saved';
