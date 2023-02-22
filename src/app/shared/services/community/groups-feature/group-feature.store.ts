import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, from, Observable, zip } from "rxjs";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { map, shareReplay, startWith, switchMap } from "rxjs/operators";
import { GroupRequest } from "src/app/models/requests/community/groups/group-request";
import { GroupPostComment } from "src/app/models/dto/community/groups/group-post-comment.dto";
import { GroupPost } from "src/app/models/dto/community/groups/group-post.dto";
import { DatabaseService } from "../../bankend/database-service/database.service";
import { CloudStorageService } from "../../bankend/cloud-storage-service/cloud-storage.service";
import { readPhotoAsBase64 } from "src/app/shared/utilities";
import { GalleryPhoto } from "@capacitor/camera";
import { Platform } from "@ionic/angular";
import { v4 as uuidv4 } from 'uuid';
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

@Injectable({
    providedIn: 'root'
})

export class GroupFeatureStore {
    private _allGroups: Observable<Group[]>;
    private _myGroups: Observable<Group[]>;
    private _latestPosts: Observable<GroupPost[]>;

    private _manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(
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

    getAllGroups(offset: number = null, limit: number = null): Observable<Group[]> {
        this._allGroups = this.dbService.getAllGroups().pipe(
            startWith([]),
            shareReplay(1)
        );

        return this._allGroups;
    }

    getGroupById(groupId: string): Observable<Group> {
        let groupObservables = [this._allGroups, this._myGroups];
        groupObservables = groupObservables.filter(groupObservable => groupObservable != null);

        const group = combineLatest(groupObservables).pipe(
            map(groups => groups.flat().find(group => group.GroupId === groupId))
        );

        return group;
    }

    getDiscoverGroups (profileId: string): Observable<Group[]> {
        return this.dbService.getDiscoverGroups(profileId);
    } 

    getMyGroups(profileId: string): Observable<Group[]> {
        this._myGroups = this.dbService.getMyGroups(profileId).pipe(
            startWith([]),
            shareReplay(1)
        );

        return this._myGroups;
    }

    joinGroup(profilePreview: ProfilePreview, groupId: string): Observable<void> {
        return this.dbService.addMemberToGroup(profilePreview, groupId);
    }

    leaveGroup(profileId: string, GroupId: string): Observable<void> {
        return this.dbService.leaveGroup(profileId, GroupId);
    }
    
    createGroup(group: GroupRequest): Observable<void> {
        return this.dbService.createGroup(group);
    }

    updateGroup(group: GroupRequest): Observable<void> {
        return this.dbService.editGroup(group);
    }

    uploadGroupCoverImage(coverImage: GalleryPhoto, groupId: string, platform: Platform): Observable<string> {
        return from(readPhotoAsBase64(coverImage, platform)).pipe(
          switchMap(imageData => this.cloudStorageService.uploadFile(imageData, `groups/${groupId}/cover-image`)),
          switchMap(uploadFileObservable => uploadFileObservable.DownloadUrl$)
        );
    }

    getLatestPosts(profileId: string, earliestPostDate: Date): Observable<GroupPost[]> {
        this._latestPosts = this.dbService.getLatestPosts(profileId, earliestPostDate).pipe(
            startWith([]),
            shareReplay(1)
        );

        return this._latestPosts;
    }

    getPostsByGroupId(groupId: string, earliestPostDate: Date): Observable<GroupPost[]> {
        return this.dbService.getPostsByGroupId(groupId, earliestPostDate);
    }

    getGroupMembers(groupId: string): Observable<ProfilePreview[]> {
        return this.dbService.getGroupMembers(groupId)
    }

    createGroupPost(groupPost: GroupPost): Observable<void> {
        return this.dbService.createGroupPost(groupPost);
    }

    createCommentOnGroupPost(newComment: GroupPostComment, groupPostId: string):Observable<void> {
        return this.dbService.createCommentOnGroupPost(newComment, groupPostId);
    }

    getCommentsByGroupPostId(groupPostId: string): Observable<GroupPostComment[]> {
        return this.dbService.getCommentsByGroupPostId(groupPostId);
    }

    deleteGroupPost(postId: string): Observable<void> {
        return this.dbService.deleteGroupPost(postId);
    }

    uploadGroupPostImages(images: GalleryPhoto[], groupPostId: string, platform: Platform): Observable<string[]> {
        const base64ImageObservables = images.map(image => from(readPhotoAsBase64(image, platform)));
    
        const downloadUrls$ = zip(...base64ImageObservables).pipe(
          switchMap(base64Images =>
            zip(...base64Images.map(imageData => this.cloudStorageService.uploadFile(imageData, `group_posts/${groupPostId}/images/${uuidv4()}`)))
          ),
          switchMap(uploadFileObservables => zip(...uploadFileObservables.map(x => x.DownloadUrl$)))
        );
    
        return downloadUrls$;
    }

    // TODO-AfterBeta: Allow an admin to delete a group.
}

type Section = 'feed' | 'events';