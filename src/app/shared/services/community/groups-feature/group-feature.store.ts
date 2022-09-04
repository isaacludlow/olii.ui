import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { GroupFeatureService } from "./group-feature.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { map, switchMap, tap } from "rxjs/operators";
import { GroupRequest } from "src/app/models/requests/community/groups/group-request";
import { CreatePostRequest } from "src/app/models/requests/community/groups/create-post-request";
import { GroupPostCommentRequest } from "src/app/models/requests/community/groups/group-post-comment-request";

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

    getGroups(offset: number = 0, limit: number = 10, refresh: boolean = false): Observable<Group[]> {
        if (this._allGroups.value === null || refresh) {
            return this.groupService.getGroups(offset, limit).pipe(switchMap(groups => {
                this._allGroups.next(groups);
                return this._allGroups.asObservable();
            }));
        } else {
            return this._allGroups.asObservable();
        }
    }

    getGroupById(groupId: number): Observable<Group> {
        if (this._allGroups.value === null) {
            return this.groupService.getGroupById(groupId).pipe(switchMap(group => {
                this._allGroups.next([group]);
                return this._allGroups.asObservable().pipe(map(allGroups => allGroups.find(x => x.GroupId === groupId)));
            }));
        } else {
            const group = this._allGroups.pipe(map(groups => groups.find(group => group.GroupId === groupId)));

            return group === undefined
                ? this.groupService.getGroupById(groupId).pipe(switchMap(group => {
                    this._allGroups.next([...this._allGroups.value, group]);
                    return this._allGroups.asObservable().pipe(map(allGroups => allGroups.find(x => x.GroupId === groupId)));
                }))
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

    createGroup(creatorProfileId: number, groupRequest: GroupRequest): Observable<Group> {
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

    createGroupPost(groupPost: CreatePostRequest):Observable<Boolean> {
        return this.groupService.createGroupPost(groupPost);
    }

    addCommentToGroupPost(newCommentRequest: GroupPostCommentRequest):Observable<Boolean> {
        return this.groupService.addCommentToGroupPost(newCommentRequest);
    }

    // TODO-AfterBeta: Allow an admin to delete a group.
}

type Section = 'feed' | 'events';