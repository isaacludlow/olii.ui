import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of, zip } from "rxjs";
import { GroupFeatureService } from "./group-feature.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { map, switchMap, tap } from "rxjs/operators";
import { GroupRequest } from "src/app/models/requests/community/groups/group-request";
import { CreatePostRequest } from "src/app/models/requests/community/groups/create-post-request";
import { GroupPostCommentRequest } from "src/app/models/requests/community/groups/group-post-comment-request";
import { GroupPost } from "src/app/models/dto/community/groups/group-post.dto";
import { DatabaseService } from "../../bankend/database-service/database.service";
import { CloudStorageService } from "../../bankend/cloud-storage-service/cloud-storage.service";
import { readPhotoAsBase64 } from "src/app/shared/utilities";
import { GalleryPhoto } from "@capacitor/camera";
import { Platform } from "@ionic/angular";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class GroupFeatureStore {
    private _allGroups = new BehaviorSubject<Group[]>([]);
    private _myGroups = new BehaviorSubject<Group[]>([]);
    private _manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(
        private groupService: GroupFeatureService,
        private dbService: DatabaseService,
        private cloudStorageService: CloudStorageService
    ) {}

	set groupSection(section: Section) {
		this._manualOverrideForGroupSection.next(section);
	}

	get groupSection() {
		const currentSection = this._manualOverrideForGroupSection.value;
		this._manualOverrideForGroupSection.next('feed');
		
		return currentSection;
	}

    getGroups(refresh: boolean = false, limit: number = null, offset: number = null): Observable<Group[]> {
        // Legacy
        if (this._allGroups.value === null || refresh) {
            return this.groupService.getGroups(limit, offset).pipe(switchMap(groups => {
                this._allGroups.next(groups);
                return this._allGroups.asObservable();
            }));
        } else {
            return this._allGroups.asObservable();
        }
    }

    getGroupById(groupId: string): Observable<Group> {
        const groupQuery = this._allGroups.value.find(group => group.GroupId === groupId);

        if (groupQuery === undefined) {
            return this.dbService.getGroupById(groupId).pipe(
                switchMap(group => {
                    this._allGroups.next([...this._allGroups.value, group]);
                    return this._allGroups.asObservable().pipe(map(allGroups => allGroups.find(x => x.GroupId === groupId)));
                })
            );
        } else {
            return this._allGroups.asObservable().pipe(map(groups => groups.find(group => group.GroupId === groupId)));
        }
    }

    getMyGroups(profileId: string): Observable<Group[]> {
        if (this._myGroups.value.length > 0) {
            return this._myGroups.asObservable();
        } else {
            return this.dbService.getMyGroups(profileId).pipe(switchMap(groups => {
                this._myGroups.next(groups);
                return this._myGroups.asObservable();
            }));
        }
    }

    createGroup(group: GroupRequest): Observable<void> {
        return this.dbService.createGroup(group);
    }

    updateGroup(group: GroupRequest): Observable<void> {
        const editedGroupIndex = this._allGroups.value.findIndex(x => x.GroupId === group.GroupId);
        this._allGroups.value.splice(editedGroupIndex , 1)
        this._allGroups.next(this._allGroups.value);

        return this.dbService.editGroup(group);
    }

    uploadEventImages(images: GalleryPhoto[], groupPostId: string, platform: Platform): Observable<string[]> {
        const base64ImageObservables = images.map(image => from(readPhotoAsBase64(image, platform)));
    
        const downloadUrls$ = zip(...base64ImageObservables).pipe(
          switchMap(base64Images =>
            zip(...base64Images.map(imageData => this.cloudStorageService.uploadFile(imageData, `group_posts/${groupPostId}/images/${uuidv4()}`)))
          ),
          switchMap(uploadFileObservables => zip(...uploadFileObservables.map(x => x.DownloadUrl$)))
        );
    
        return downloadUrls$;
      }

    uploadGroupCoverImage(coverImage: GalleryPhoto, groupId: string, platform: Platform): Observable<string> {
        return from(readPhotoAsBase64(coverImage, platform)).pipe(
          switchMap(imageData => this.cloudStorageService.uploadFile(imageData, `groups/${groupId}/cover-image`)),
          switchMap(uploadFileObservable => uploadFileObservable.DownloadUrl$)
        );
      }

    getLatestPosts(profileId: string, earliestPostDate: Date): Observable<GroupPost[]> {
        return this.dbService.getLatestPosts(profileId, earliestPostDate);
    }

    getPostsByGroupId(groupId: string, earliestPostDate: Date): Observable<GroupPost[]> {
        return this.dbService.getPostsByGroupId(groupId, earliestPostDate).pipe(
            tap(posts => {
                let allGroups = this._allGroups.value;
                let foundFromAllGroups = allGroups.find(x => x.GroupId === groupId);
                let myGroups = this._myGroups.value;
                let foundFromMyGroups = myGroups.find(x => x.GroupId === groupId);

                if (foundFromAllGroups != undefined) {
                    foundFromAllGroups.Posts.push(...posts);
                }

                if (foundFromMyGroups != undefined) {
                    foundFromMyGroups.Posts.push(...posts);
                }
            })
        );
    }

    createGroupPost(groupPost: GroupPost): Observable<void> {
        return this.dbService.createGroupPost(groupPost);
    }

    addCommentToGroupPost(newCommentRequest: GroupPostCommentRequest, groupPostId: string):Observable<Boolean> {
        return this.dbService.addCommentToGroupPost(newCommentRequest, groupPostId);
    }

    // TODO-AfterBeta: Allow an admin to delete a group.
}

type Section = 'feed' | 'events';