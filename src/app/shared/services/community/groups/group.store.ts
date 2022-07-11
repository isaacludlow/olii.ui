import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { GroupService } from "./group.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";

@Injectable({
    providedIn: 'root'
})

export class GroupStore {

    private manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(private groupService: GroupService) {}

	set groupSection(section: Section) {
		this.manualOverrideForGroupSection.next(section);
	}

	get groupSection() {
		const currentSection = this.manualOverrideForGroupSection.value;
		this.manualOverrideForGroupSection.next('feed');
		
		return currentSection;
	}

    // TODO: We'll need to figure out caching so that both getGroupAll() and
    // getGroupById don't have to query every time.  Probably just a data
    // structure to hold all a user's related groups cache is queried once and then
    // pull the data from there
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

type Section = 'feed' | 'events';