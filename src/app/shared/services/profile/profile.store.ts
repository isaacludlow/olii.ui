import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, from, Observable, zip } from "rxjs";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SubSink } from "subsink";
import { ProfileService } from "./profile.service";
import { UserStore } from "../user/user.store";
import { ProfileRequestSavedAlbum } from "src/app/models/requests/profile/profile-request-saved-album";
import { DatabaseService } from "../bankend/database-service/database.service";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { SavedImagesAlbum } from "src/app/models/dto/profile/saved-images-album.dto";
import { GalleryPhoto } from "@capacitor/camera";
import { Platform } from "@ionic/angular";
import { shareReplay, switchMap } from "rxjs/operators";
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
		return this.dbService.getProfileById(profileId).pipe(shareReplay(1));
	}

	createNewProfile(profile: Profile): Observable<void> {
		return this.dbService.createProfile(profile);
	}

	updateProfile(profile: Profile): Observable<void> {
		return this.dbService.updateProfile(profile);
	}

	uploadProfilePicture(profilePicture: GalleryPhoto, profileId: string, platform: Platform): Observable<string> {
        return from(readPhotoAsBase64(profilePicture, platform)).pipe(
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
