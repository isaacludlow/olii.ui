import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { GroupFeatureService } from "./group-feature.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { map, switchMap, tap } from "rxjs/operators";
import { GroupRequest } from "src/app/models/requests/community/groups/group-request";
import { CreatePostRequest } from "src/app/models/requests/community/groups/create-post-request";
import { GroupPostCommentRequest } from "src/app/models/requests/community/groups/group-post-comment-request";
import { GroupPost } from "src/app/models/dto/community/groups/group-post.dto";
import { LatestGroupPost } from "src/app/models/dto/community/groups/group-latest-post.dto";
import { DatabaseService } from "../../bankend/database-service/database.service";

@Injectable({
    providedIn: 'root'
})

export class GroupFeatureStore {
    private _allGroups = new BehaviorSubject<Group[]>([]);
    private _myGroups = new BehaviorSubject<Group[]>([]);
    private _manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(private groupService: GroupFeatureService, private dbService: DatabaseService) {}

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

    createGroup(creatorProfileId: string, groupRequest: GroupRequest): Observable<Group> {
        return this.groupService.createGroup(creatorProfileId, groupRequest).pipe(
            tap(group => {
                if (this._allGroups.value === null)
                    this._allGroups.next([group]);
                else
                    this._allGroups.next([...this._allGroups.value, group]);

                if (this._myGroups.value === null)
                    this._myGroups.next([group]);
                else
                    this._myGroups.next([...this._myGroups.value, group]);
            })
        );
    }

    updateGroup(groupRequest: GroupRequest): Observable<Group> {
        return this.groupService.updateGroup(groupRequest).pipe(
            tap(group => {
                let allGroups = this._allGroups.value;
                let allGroupsIndex = allGroups.findIndex(x => x.GroupId === groupRequest.GroupId);
                allGroups.splice(allGroupsIndex, 1, group);
                this._allGroups.next([...allGroups]);

                let myGroups = this._myGroups.value;
                let myGroupsIndex = myGroups.findIndex(x => x.GroupId === groupRequest.GroupId);
                myGroups.splice(myGroupsIndex, 1, group);
                this._myGroups.next([...myGroups]);
            })
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

    createGroupPost(groupId: string, groupPost: CreatePostRequest): Observable<Boolean> {
        return this.groupService.createGroupPost(groupId, groupPost).pipe(
            map(groupPost => {
                let allGroups = this._allGroups.value;
                let foundFromAllGroups = allGroups.find(x => x.GroupId === groupId);
                let myGroups = this._myGroups.value;
                let foundFromMyGroups = myGroups.find(x => x.GroupId === groupId);

                if (foundFromAllGroups != undefined) {
                    foundFromAllGroups.Posts.push(groupPost);
                }

                if (foundFromMyGroups != undefined) {
                    foundFromMyGroups.Posts.push(groupPost);
                }

                return true;
            })
        );
    }

    addCommentToGroupPost(newCommentRequest: GroupPostCommentRequest):Observable<Boolean> {
        return this.groupService.addCommentToGroupPost(newCommentRequest);
    }

    // TODO-AfterBeta: Allow an admin to delete a group.
}

type Section = 'feed' | 'events';