import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { GroupService } from "./group.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";

@Injectable({
    providedIn: 'root'
})

export class GroupStore {

    constructor(private groupService: GroupService) {}

    getGroupAll() {
        return this.groupService.getGroupAll();
    }

    getGroupById(groupId: number): Observable<Group> {
        return this.groupService.getGroupById(groupId);
    }

    postNewGroup() {

    }

    // Delete Group?
}