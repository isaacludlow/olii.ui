import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { GroupFeatureService } from "./group-feature.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { map, switchMap, tap } from "rxjs/operators";
import { GroupRequest } from "src/app/models/requests/community/groups/group-request";
import { CreatePostRequest } from "src/app/models/requests/community/groups/create-post-request";
import { GroupPostCommentRequest } from "src/app/models/requests/community/groups/group-post-comment-request";
import { GroupPost } from "src/app/models/dto/community/groups/group-post.dto";

@Injectable({
    providedIn: 'root'
})

export class GroupFeatureStore {
    private _allGroups = new BehaviorSubject<Group[]>(null);
    private _myGroups = new BehaviorSubject<Group[]>(null);
    private _manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(private groupService: GroupFeatureService) {}

	set groupSection(section: Section) {
		this._manualOverrideForGroupSection.next(section);
	}

	get groupSection() {
		const currentSection = this._manualOverrideForGroupSection.value;
		this._manualOverrideForGroupSection.next('feed');
		
		return currentSection;
	}

    getGroups(refresh: boolean = false, limit: number = null, offset: number = null): Observable<Group[]> {
        if (this._allGroups.value === null || refresh) {
            return this.groupService.getGroups(limit, offset).pipe(switchMap(groups => {
                this._allGroups.next(groups);
                return this._allGroups.asObservable();
            }));
        } else {
            return this._allGroups.asObservable();
        }
    }

    getGroupById(groupId: number): Observable<Group> {
        if (this._allGroups.value === null) {
            return this.groupService.getGroupById(groupId).pipe(tap(group => this._allGroups.next([group])));
        } else {
            const group = this._allGroups.pipe(map(groups => groups.find(group => group.Id === groupId)));

            return group === undefined
                ? this.groupService.getGroupById(groupId).pipe(tap(group => this._allGroups.next([...this._allGroups.value, group])))
                : group;
        }
    }

    getMyGroups(profileId: number): Observable<Group[]> {
        if (this._myGroups.value === null) {
            return this.groupService.getMyGroups(profileId).pipe(switchMap(groups => {
                this._myGroups.next(groups);
                return this._myGroups.asObservable();
            }));
        } else {
            return this._myGroups.asObservable();
        }
    }

    createGroup(groupRequest: GroupRequest): Observable<Group> {
        return this.groupService.createGroup(groupRequest).pipe(
            tap(group => {
                this._allGroups.next([...this._allGroups.value, group]);
                this._myGroups.next([...this._myGroups.value, group]);
            })
        );
    }

    updateGroup(groupRequest: GroupRequest): Observable<Group> {
        return this.groupService.updateGroup(groupRequest).pipe(
            tap(group => {
                this._allGroups.next([...this._allGroups.value, group]);
                this._myGroups.next([...this._myGroups.value, group]);
            })
        );
    }

    getPostsByGroupId(groupId: number, refresh?: boolean, limit: number = null, offset: number = null): Observable<GroupPost[]> {
        let allGroups = this._allGroups.value;
        let foundFromAllGroups = allGroups.find(x => x.Id === groupId);
        let myGroups = this._myGroups.value;
        let foundFromMyGroups = myGroups.find(x => x.Id === groupId);

        // if (foundFromAllGroups != undefined && foundFromAllGroups.Posts.length > 0) {
        //     return of(foundFromAllGroups.Posts);
        // }

        // if (foundFromMyGroups != undefined && foundFromMyGroups.Posts.length > 0) {
        //     return of(foundFromMyGroups.Posts);
        // }

        return this.groupService.getPostsByGroupId(groupId, limit, offset).pipe(
            tap(posts => {
                let allGroups = this._allGroups.value;
                let foundFromAllGroups = allGroups.find(x => x.Id === groupId);
                let myGroups = this._myGroups.value;
                let foundFromMyGroups = myGroups.find(x => x.Id === groupId);

                if (foundFromAllGroups != undefined) {
                    foundFromAllGroups.Posts.push(...posts);
                }

                if (foundFromMyGroups != undefined) {
                    foundFromMyGroups.Posts.push(...posts);
                }
            })
        );
    }

    createGroupPost(groupId: number, groupPost: CreatePostRequest): Observable<Boolean> {
        return this.groupService.createGroupPost(groupId, groupPost).pipe(
            map(groupPost => {
                let allGroups = this._allGroups.value;
                let foundFromAllGroups = allGroups.find(x => x.Id === groupId);
                let myGroups = this._myGroups.value;
                let foundFromMyGroups = myGroups.find(x => x.Id === groupId);

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